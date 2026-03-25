# Questify

Questify ist jetzt als Full-Stack-Projekt aufgebaut:

- Frontend: React + TypeScript + Vite
- Backend: Python + FastAPI
- Datenbank: PostgreSQL

## Projektstruktur

- `src/` – React-Frontend
- `backend/app/` – FastAPI-App, Modelle, Routen und Services
- `backend/requirements.txt` – Python-Abhängigkeiten
- `.env.example` – Frontend-Umgebungsvariablen
- `backend/.env.example` – Backend-Umgebungsvariablen

## Voraussetzungen

- Node.js 20+
- Python 3.9+
- PostgreSQL

## Backend einrichten

1. PostgreSQL-Datenbank anlegen, z. B. `questify`
2. Backend-Umgebungsvariablen anlegen:
   - `cp backend/.env.example backend/.env`
3. Falls nötig die Zugangsdaten in `backend/.env` anpassen
4. Python-Abhängigkeiten installieren:
   - `npm run install:backend`
5. Backend starten:
   - `npm run dev:backend`

Die API läuft dann standardmäßig unter `http://localhost:8000`.

## Frontend einrichten

1. Frontend-Umgebungsvariablen anlegen:
   - `cp .env.example .env`
2. Abhängigkeiten installieren:
   - `npm install`
3. Frontend starten:
   - `npm run dev:frontend`

Das Frontend läuft dann standardmäßig unter `http://localhost:5173`.

## Wichtige API-Endpunkte

- `GET /health`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/{id}/complete`
- `POST /api/ai/suggest-tasks`
- `POST /api/ai/rewrite-task`
- `POST /api/ai/suggest-xp`
- `POST /api/ai/motivation`

## Hinweise

- Die Daten kommen jetzt aus dem FastAPI-Backend statt aus `localStorage`.
- Die KI-Funktionen laufen über API-Endpunkte und nutzen aktuell weiterhin einfache Mock-/Regel-Logik.
- Beim ersten Start werden Demo-Tasks in die Datenbank geschrieben, wenn noch keine Aufgaben vorhanden sind.

## Docker starten

Mit Docker kannst du Frontend, Backend und PostgreSQL zusammen starten:

- `docker compose up --build`

Danach sind die Services erreichbar unter:

- Frontend: `http://localhost:8080`
- Backend: `http://localhost:8000`
- API Healthcheck: `http://localhost:8000/health`
- PostgreSQL: `localhost:5432`

Die Standard-Zugangsdaten für PostgreSQL in Docker sind:

- Datenbank: `questify`
- Nutzer: `postgres`
- Passwort: `postgres`

Zum Stoppen:

- `docker compose down`

Wenn du auch die Datenbankdaten löschen willst:

- `docker compose down -v`
