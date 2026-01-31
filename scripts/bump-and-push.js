#!/usr/bin/env node
/**
 * Skrypt: pyta o nr wersji, aktualizuje package.json, robi commit (z opisem) i push na GitHub.
 * Uruchom: node scripts/bump-and-push.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');

const packagePath = path.join(__dirname, '..', 'package.json');

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer ? answer.trim() : ''));
  });
}

function validateVersion(ver) {
  return (
    /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?(\+[a-zA-Z0-9.-]+)?$/.test(ver) ||
    /^\d+\.\d+\.\d+$/.test(ver)
  );
}

function runGit(args) {
  const r = spawnSync('git', args, { stdio: 'inherit' });
  if (r.status !== 0) {
    const err = new Error('Git zakończył się błędem');
    err.status = r.status;
    throw err;
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const pkgCurrent = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
    const currentVersion = pkgCurrent.version || '0.0.0';

    const versionInput = await ask(
      rl,
      `Podaj nową wersję (obecna: ${currentVersion}): `
    );
    if (!versionInput) {
      console.error('Nie podano wersji. Koniec.');
      rl.close();
      process.exit(1);
    }
    const version = versionInput.replace(/^v/, ''); // usuń ewentualne "v"
    if (!validateVersion(version)) {
      console.error(
        'Nieprawidłowy format wersji (oczekiwane np. 1.2.3). Koniec.'
      );
      rl.close();
      process.exit(1);
    }

    const message = await ask(rl, 'Opis commita: ');
    if (!message) {
      console.error('Nie podano opisu commita. Koniec.');
      rl.close();
      process.exit(1);
    }

    rl.close();

    pkgCurrent.version = version;
    fs.writeFileSync(
      packagePath,
      JSON.stringify(pkgCurrent, null, 2) + '\n',
      'utf-8'
    );
    console.log(`Zaktualizowano wersję: ${currentVersion} → ${version}`);

    runGit(['add', 'package.json']);
    runGit(['commit', '-m', message]);
    runGit(['push']);
    console.log('Gotowe: commit i push na GitHub wykonane.');
  } catch (err) {
    rl.close();
    if (err.status != null) process.exit(err.status);
    throw err;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
