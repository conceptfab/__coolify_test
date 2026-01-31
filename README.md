# coolify-test-app

Przykładowa aplikacja Next.js do testowania hostingu na [Coolify](https://coolify.io).

## Lokalnie

```bash
npm install
npm run dev
```

Aplikacja: http://localhost:3000

## Build produkcyjny

```bash
npm run build
npm start
```

## Wersja i push na GitHub

```bash
npm run release
```

Skrypt pyta o **nową wersję** (np. `0.2.0`), aktualizuje `package.json`, pyta o **opis commita**, wykonuje `git add package.json`, `git commit` i `git push`. Uruchamiaj z katalogu głównego repozytorium (z skonfigurowanym zdalnym `origin`).

## Coolify / Docker

- W katalogu jest **Dockerfile** (multi-stage, Next.js standalone).
- W Coolify: dodaj aplikację z repozytorium lub lokalnego kontekstu, wybierz **Dockerfile** jako metodę buildu.
- Port: **3000**.

### Pre-deploy w Coolify

Skrypt **`scripts/predeploy.sh`** jest uruchamiany w istniejącym kontenerze przed wdrożeniem (opcjonalnie).

1. W Coolify: **Resource → General → Advanced** (lub **Pre/Post Deployment Commands**).
2. W polu **Pre-deployment** wpisz:  
   `sh /app/scripts/predeploy.sh`
3. Zapisz i wdróż. Przed każdym wdrożeniem Coolify uruchomi ten skrypt w bieżącym kontenerze.

Skrypt wypisuje m.in. `PORT`, `NODE_ENV` oraz informację, czy ustawione są zmienne Coolify (`COOLIFY_FQDN`, `COOLIFY_URL`, `COOLIFY_BRANCH`, `COOLIFY_CONTAINER_NAME`). Nie zmienia nic w systemie; przy błędzie możesz przerwać wdrożenie w Coolify.

**Lokalnie** (przed push/deploy): `npm run predeploy` uruchamia lint.

## Strony

- **/** – statystyki (Node, platforma, pamięć, uptime, nazwy zmiennych env).
- **/ports** – zajęte porty **kontenera** (nie hosta), z opisem usługi/procesu.
- **/coolify-env** – zmienne predefiniowane Coolify (czy zdefiniowane: Tak/Nie) oraz inne zdefiniowane zmienne (tylko nazwy).
- **/api/stats**, **/api/ports**, **/api/coolify-env** – odpowiedzi JSON.

Wartości zmiennych ani sekrety nie są nigdzie wyświetlane.
