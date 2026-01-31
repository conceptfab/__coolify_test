import { readFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

export type PortEntry = {
  port: number;
  address: string;
  process?: string;
  protocol: string;
};

const LISTEN_STATE = '0A'; // TCP_LISTEN in /proc/net/tcp

function parseHexPort(hexPort: string): number {
  return parseInt(hexPort, 16);
}

function parseProcNetTcp(content: string): { port: number; address: string }[] {
  const lines = content.trim().split('\n').slice(1); // skip header
  const result: { port: number; address: string }[] = [];
  for (const line of lines) {
    const parts = line.trim().split(/\s+/);
    if (parts.length < 4) continue;
    const state = parts[3];
    if (state !== LISTEN_STATE) continue;
    const local = parts[1]; // e.g. "00000000:1F40"
    const [addrHex, portHex] = local.split(':');
    if (!portHex) continue;
    const port = parseHexPort(portHex);
    const address = addrHex === '00000000' ? '0.0.0.0' : addrHex;
    result.push({ port, address });
  }
  return result;
}

function trySsTlnp(): Map<number, string> {
  const map = new Map<number, string>();
  try {
    const out = execSync('ss -tlnp 2>/dev/null', {
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024,
    });
    const lines = out.trim().split('\n').slice(1);
    for (const line of lines) {
      if (!line.includes('LISTEN')) continue;
      const cols = line.trim().split(/\s+/);
      const localCol = cols[3];
      if (localCol) {
        const portStr = localCol.split(':').pop();
        const port = portStr ? parseInt(portStr, 10) : NaN;
        if (!Number.isNaN(port)) {
          const processMatch = line.match(/users:\(\(\"([^"]+)\"/);
          const proc = processMatch ? processMatch[1] : undefined;
          if (proc && !map.has(port)) map.set(port, proc);
        }
      }
    }
  } catch {
    // ss not available or permission
  }
  return map;
}

export function getPorts(): {
  ports: PortEntry[];
  scope: string;
  error?: string;
} {
  const portsMap = new Map<number, PortEntry>();

  if (process.platform !== 'linux') {
    return {
      ports: [],
      scope: 'container',
      error: 'Lista portów dostępna tylko na Linuxie (kontener/host).',
    };
  }

  try {
    const procFiles = ['/proc/net/tcp', '/proc/net/tcp6'] as const;
    for (const file of procFiles) {
      if (!existsSync(file)) continue;
      const content = readFileSync(file, 'utf-8');
      const protocol = file.includes('tcp6') ? 'TCP (IPv6)' : 'TCP (IPv4)';
      for (const { port, address } of parseProcNetTcp(content)) {
        if (!portsMap.has(port)) {
          portsMap.set(port, { port, address, protocol });
        }
      }
    }

    const processByPort = trySsTlnp();
    const sorted = Array.from(portsMap.values()).sort(
      (a, b) => a.port - b.port
    );
    for (const entry of sorted) {
      const proc = processByPort.get(entry.port);
      if (proc) entry.process = proc;
    }

    return {
      ports: sorted,
      scope: 'container',
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return {
      ports: [],
      scope: 'container',
      error: `Błąd odczytu: ${message}`,
    };
  }
}
