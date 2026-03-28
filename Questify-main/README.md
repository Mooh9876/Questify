# Questify

Questify ist eine Full-Stack-Webanwendung, die alltägliche Aufgaben in kleine motivierende Quests verwandelt. Nutzerinnen und Nutzer koennen Aufgaben erstellen, abschliessen, XP sammeln und ihren Fortschritt ueber ein Level-System verfolgen. Zusaetzlich unterstuetzt eine einfache KI-Logik beim Formulieren von Aufgaben, beim Vorschlagen neuer Quests und bei der Einschaetzung passender XP.

## Ueberblick

Die Anwendung besteht aus drei zentralen Teilen:

- Frontend mit React, TypeScript und Vite
- Backend mit FastAPI und Python
- PostgreSQL-Datenbank zur Speicherung der Aufgaben

Questify verbindet Produktivitaet mit einem spielerischen Ansatz. Statt einer klassischen To-do-Liste entsteht ein kleines Fortschrittssystem mit XP, Levels und motivierenden Rueckmeldungen.

## Features

- Aufgaben als Quests anlegen
- Aufgaben als erledigt markieren
- XP fuer abgeschlossene Aufgaben sammeln
- Coins fuer abgeschlossene Aufgaben sammeln
- Level-Fortschritt live im Dashboard sehen
- KI-gestuetzte Aufgabenvorschlaege nach Kategorien
- Aufgabenformulierung verbessern lassen
- XP-Vorschlaege fuer neue Aufgaben erhalten
- Motivierende Rueckmeldungen nach abgeschlossenen Quests
- Eigenes Profil mit Coin-Stand
- Persistente Speicherung in PostgreSQL
- Start ueber lokale Entwicklung oder Docker

## Verwendete Technologien

### Frontend

- React
- TypeScript
- Vite
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy

### Datenbank

- PostgreSQL

### Container / Deployment

- Docker
- Docker Compose
- Nginx

## Projektidee

Viele Aufgabenlisten fuehlen sich schnell trocken und unmotivierend an. Questify verfolgt deshalb einen spielerischen Ansatz: Kleine Alltagsaufgaben werden als Quests dargestellt, jede erledigte Aufgabe bringt Erfahrungspunkte und der Gesamtfortschritt wird sichtbar. So entsteht ein motivierenderes Nutzungserlebnis, das besonders fuer Studium, Haushalt, Alltag und persoenliche Routinen geeignet ist.

## Projektstruktur

```text
Questify/
├── src/                     # React-Frontend
├── backend/
│   ├── app/                 # FastAPI-App
│   ├── requirements.txt     # Python-Abhaengigkeiten
│   └── Dockerfile
├── docker/
│   └── nginx/               # Nginx-Konfiguration fuer das Frontend
├── docker-compose.yml
├── Dockerfile               # Frontend-Build + Nginx
├── package.json
├── .env.example
└── backend/.env.example
```

## Funktionsweise

### Frontend

Im Frontend koennen Nutzer neue Quests anlegen, vorhandene Aufgaben anzeigen und abgeschlossene Aufgaben markieren. Zusaetzlich werden dort KI-Funktionen ausgeloest, zum Beispiel:

- Aufgaben nach Kategorie vorschlagen
- einen Titel besser formulieren
- XP fuer eine Aufgabe empfehlen

Ausserdem berechnet das Frontend aus allen erledigten Aufgaben den aktuellen Fortschritt, die XP und das naechste Level.
Nach dem Abschliessen einer Quest wird zusaetzlich der aktuelle Coin-Stand geladen und im Dashboard angezeigt.

### Backend

Das Backend stellt REST-Endpunkte bereit, verarbeitet Aufgaben und liefert KI-bezogene Antworten zurueck. Beim Start werden Tabellen automatisch angelegt. Wenn die Datenbank noch leer ist, werden Demo-Aufgaben eingefuegt.

### Datenbank

Alle Aufgaben werden dauerhaft in PostgreSQL gespeichert. Dadurch bleiben die Daten auch nach einem Neustart erhalten, anders als bei einer reinen Speicherung im Browser.

## Voraussetzungen

Fuer die lokale Entwicklung brauchst du:

- Node.js 20 oder neuer
- Python 3.9 oder neuer
- PostgreSQL
- optional Docker und Docker Compose

## Lokale Entwicklung

### 1. Repository klonen

```bash
git clone https://github.com/Mooh9876/Questify.git
cd Questify
```

### 2. Frontend konfigurieren

Erstelle eine `.env` auf Basis der Beispiel-Datei:

```bash
cp .env.example .env
```

Standardwert:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. Backend konfigurieren

Erstelle die Backend-Umgebungsdatei:

```bash
cp backend/.env.example backend/.env
```

Beispielwerte:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/questify
CORS_ORIGINS=http://localhost:5173
```

Passe die Werte bei Bedarf an deine lokale PostgreSQL-Instanz an.

### 4. Frontend-Abhaengigkeiten installieren

```bash
npm install
```

### 5. Python-Abhaengigkeiten installieren

Im Projekt wird dafuer das vorhandene virtuelle Environment verwendet:

```bash
npm run install:backend
```

### 6. Backend starten

```bash
npm run dev:backend
```

Das Backend laeuft anschliessend unter:

```text
http://localhost:8000
```

### 7. Frontend starten

In einem zweiten Terminal:

```bash
npm run dev:frontend
```

Das Frontend laeuft anschliessend unter:

```text
http://localhost:5173
```

## Nützliche Skripte

```bash
npm run dev
npm run dev:frontend
npm run dev:backend
npm run build
npm run preview
npm run docker:up
npm run docker:down
npm run docker:restart
```

## Docker-Setup

Mit Docker kannst du Frontend, Backend und Datenbank gemeinsam starten.

### Starten

```bash
docker compose up --build
```

Der Docker-Projektname ist in der Compose-Konfiguration auf `llm-projekt` gesetzt. Docker erlaubt hier keine Leerzeichen, daher wird `LLM Projekt` technisch als `llm-projekt` verwendet.

Danach sind die Services erreichbar unter:

- Frontend: http://localhost:8080
- Backend: http://localhost:8000
- Healthcheck: http://localhost:8000/health
- PostgreSQL: localhost:5432

### Standarddaten fuer Docker

- Datenbank: `questify`
- Benutzer: `postgres`
- Passwort: `postgres`

### Stoppen

```bash
docker compose down
```

### Mit Datenloeschung stoppen

```bash
docker compose down -v
```

## API-Endpunkte

### Allgemein

- `GET /health`

### Aufgaben

- `GET /api/tasks`
- `GET /api/tasks/profile`
- `POST /api/tasks`
- `PATCH /api/tasks/{task_id}/complete`

### KI-Funktionen

- `POST /api/ai/suggest-tasks`
- `POST /api/ai/rewrite-task`
- `POST /api/ai/suggest-xp`

## Beispiel fuer API-Nutzung

### Aufgabe erstellen

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "30 Minuten Mathe lernen",
  "description": "Kapitel 2 wiederholen",
  "xp": 20
}
```

### Aufgabe abschliessen

```http
PATCH /api/tasks/{task_id}/complete
```

### Aufgaben nach Kategorie vorschlagen

```http
POST /api/ai/suggest-tasks
Content-Type: application/json
```

```json
{
  "category": "Uni"
}
```

## Anwendungsszenario

Ein typischer Ablauf in Questify sieht so aus:

1. Eine neue Aufgabe wird erstellt
2. Die Anwendung weist der Aufgabe XP zu
3. Die Aufgabe erscheint in der offenen Aufgabenliste
4. Nach dem Abschliessen werden XP und Coins gutgeschrieben
5. Das Dashboard aktualisiert Level, Fortschritt und Coin-Stand
6. Optional koennen neue Quest-Ideen oder bessere Formulierungen ueber die KI-Funktionen abgerufen werden

## Besondere Hinweise

- Die Aufgaben werden nicht nur im Browser gespeichert, sondern in PostgreSQL
- Beim ersten Start koennen Demo-Daten automatisch eingefuegt werden
- Die KI-Funktionen verwenden aktuell einfache Regel-Logik
- Fuer das Frontend wird im Docker-Setup Nginx verwendet
- Build-Artefakte wie `dist` oder `node_modules` gehoeren nicht ins Repository

## Moegliche Erweiterungen

- Benutzerkonten und Login
- persoenliche Profile
- verschiedene Schwierigkeitsgrade fuer Quests
- Belohnungssystem mit Achievements
- echte KI-Integration ueber externe APIs
- Filter, Suche und Sortierung fuer Aufgaben
- mobile Optimierung oder App-Version

## Fazit

Questify zeigt, wie eine klassische Aufgabenverwaltung durch Gamification motivierender gestaltet werden kann. Durch die Kombination aus React-Frontend, FastAPI-Backend und PostgreSQL entsteht eine moderne Full-Stack-Anwendung, die sich gut als Hochschulprojekt, Portfolio-Projekt oder Grundlage fuer weitere Erweiterungen eignet.
