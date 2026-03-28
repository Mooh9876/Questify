from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from .models import Task
from .services import get_or_create_profile


SEED_TASKS = [
    Task(
        id='task-1',
        title='30 Minuten lernen',
        description='Kapitel 2 wiederholen',
        xp=20,
        completed=False,
        created_at=datetime(2026, 3, 23, 10, 0, tzinfo=timezone.utc),
    ),
    Task(
        id='task-2',
        title='1 Liter Wasser trinken',
        description='Über den Nachmittag verteilt',
        xp=10,
        completed=True,
        created_at=datetime(2026, 3, 23, 11, 0, tzinfo=timezone.utc),
    ),
    Task(
        id='task-3',
        title='Schreibtisch aufräumen',
        description='Unterlagen sortieren und Platz schaffen',
        xp=15,
        completed=False,
        created_at=datetime(2026, 3, 23, 12, 0, tzinfo=timezone.utc),
    ),
]


def seed_tasks(db: Session) -> None:
    get_or_create_profile(db)
    existing_task = db.scalar(select(Task.id).limit(1))
    if existing_task is not None:
        db.commit()
        return

    db.add_all(SEED_TASKS)
    db.commit()
