# Diese Datei enthält alle Texte und Hilfsfunktionen für die KI-Funktionen.
# Hier stehen z.B. die Quest-Vorschläge nach Kategorie (Uni, Fitness, etc.)
# und die Motivationstexte, die nach dem Abschließen einer Quest angezeigt werden.
# Außerdem berechnet diese Datei Level und XP des Spielers.

from __future__ import annotations

from ..models import Task

SUGGESTION_MAP: dict[str, list[str]] = {
    'Uni': [
        '30 Minuten Mathe lernen',
        'Vorlesungsnotizen ordnen',
        'Kapitel 2 wiederholen',
        'Eine Zusammenfassung schreiben',
    ],
    'Haushalt': [
        'Schreibtisch aufräumen',
        'Wäsche sortieren',
        'Müll rausbringen',
        'Küche sauber machen',
    ],
    'Fitness': [
        '20 Minuten spazieren gehen',
        'Kurzes Home-Workout machen',
        '10 Minuten Dehnen',
        'Fahrrad fahren',
    ],
    'Gesundheit': [
        '1 Liter Wasser trinken',
        'Gesundes Mittagessen vorbereiten',
        '15 Minuten Pause ohne Handy',
        'Früh schlafen gehen',
    ],
    'Alltag': [
        'E-Mails beantworten',
        'Einkaufsliste schreiben',
        'Termine für morgen prüfen',
        'Rucksack vorbereiten',
    ],
}

MOTIVATION_MESSAGES = [
    'Stark, Quest abgeschlossen.',
    'Du kommst deinem nächsten Level näher.',
    'Sauber erledigt – weiter so.',
    'Ein kleiner Schritt, viel Fortschritt.',
    'Questify sieht deinen Fortschritt.',
]


def rewrite_task_title(input_text: str) -> str:
    trimmed = input_text.strip()

    if not trimmed:
        raise ValueError('Bitte gib zuerst eine Aufgabe ein.')

    lowered = trimmed.lower()

    if 'mathe lernen' in lowered:
        return '30 Minuten Mathe lernen'
    if 'zimmer' in lowered:
        return 'Zimmer in 15 Minuten aufräumen'
    if 'wasser' in lowered:
        return '1 Liter Wasser trinken'
    if 'sport' in lowered:
        return '20 Minuten Sport machen'

    return trimmed[0].upper() + trimmed[1:] + ('' if 'minuten' in lowered else ' in 25 Minuten')


def suggest_xp(title: str) -> int:
    normalized = title.lower()

    if any(keyword in normalized for keyword in ['prüf', 'projekt', 'training', 'wohn', 'putz', 'aufräum']):
        return 30
    if any(keyword in normalized for keyword in ['lernen', 'sport', 'einkauf', 'kochen', 'hausaufgaben']):
        return 20
    return 10


def calculate_total_xp(tasks: list[Task]) -> int:
    return sum(task.xp for task in tasks if task.completed)


def calculate_level(total_xp: int) -> int:
    return total_xp // 100 + 1


def motivation_for_task(completed_task: Task, tasks: list[Task]) -> str:
    total_xp = calculate_total_xp(tasks)
    level = calculate_level(total_xp)
    base_message = MOTIVATION_MESSAGES[(level + completed_task.xp) % len(MOTIVATION_MESSAGES)]
    return f'{base_message} Level {level} wartet schon auf dich.'
