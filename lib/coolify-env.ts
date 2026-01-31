/**
 * Znane zmienne środowiskowe ustawiane przez Coolify (dokumentacja).
 * Pokazujemy tylko czy są zdefiniowane – bez wartości.
 */
export const COOLIFY_KNOWN_VARS: { name: string; description: string }[] = [
  { name: 'COOLIFY_FQDN', description: 'FQDN aplikacji' },
  { name: 'COOLIFY_URL', description: 'URL aplikacji' },
  { name: 'COOLIFY_BRANCH', description: 'Branch z repozytorium' },
  { name: 'COOLIFY_RESOURCE_UUID', description: 'UUID zasobu w Coolify' },
  { name: 'COOLIFY_CONTAINER_NAME', description: 'Nazwa kontenera' },
  {
    name: 'SOURCE_COMMIT',
    description: 'Hash commita (jeśli włączone w ustawieniach)',
  },
  { name: 'PORT', description: 'Port (domyślnie pierwszy z Port Exposes)' },
  { name: 'HOST', description: 'Host (domyślnie 0.0.0.0)' },
];

export type CoolifyEnvEntry = {
  name: string;
  description: string;
  defined: boolean;
};

export function getCoolifyEnvStatus(): {
  known: CoolifyEnvEntry[];
  otherDefined: string[];
} {
  const env = process.env;
  const known: CoolifyEnvEntry[] = COOLIFY_KNOWN_VARS.map(
    ({ name, description }) => ({
      name,
      description,
      defined: typeof env[name] === 'string' && env[name]!.length > 0,
    })
  );

  const knownNames = new Set(COOLIFY_KNOWN_VARS.map((v) => v.name));
  const otherDefined = Object.keys(env)
    .filter((k) => !knownNames.has(k))
    .filter((k) => !/secret|password|key|token|credential/i.test(k))
    .sort();

  return { known, otherDefined };
}
