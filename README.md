# Coolify – Next.js statystyki

Przykładowy projekt Next.js do testowania lokalnego hostingu na [Coolify](https://coolify.io).

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

## Coolify / Docker

- W katalogu jest **Dockerfile** (multi-stage, Next.js standalone).
- W Coolify: dodaj aplikację z repozytorium lub lokalnego kontekstu, wybierz **Dockerfile** jako metodę buildu.
- Port: **3000**.

## Strona

- **/** – strona z podstawowymi statystykami (Node, platforma, pamięć, uptime, lista nazw zmiennych środowiskowych).
- **/api/stats** – ten sam zestaw statystyk w formacie JSON (np. do health checków).

Statystyki są generowane po stronie serwera; nie ujawniają wartości zmiennych zawierających „secret”, „key” ani „password”.
