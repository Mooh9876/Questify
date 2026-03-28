from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Task
from ..schemas import (
    TaskCompleteResponse,
    TaskCreate,
    TaskListResponse,
    TaskRead,
    UserProfileRead,
    UserProfileResponse,
)
from ..services import (
    apply_reward,
    generate_coin_reward,
    get_or_create_profile,
    motivation_for_task,
    serialize_profile,
    serialize_reward,
    update_streak,
)

router = APIRouter(prefix='/tasks', tags=['tasks'])


@router.get('/profile', response_model=UserProfileResponse)
def get_profile(db: Session = Depends(get_db)) -> UserProfileResponse:
    profile = get_or_create_profile(db)
    db.commit()
    db.refresh(profile)
    return UserProfileResponse(profile=UserProfileRead.model_validate(serialize_profile(profile)))


@router.get('', response_model=TaskListResponse)
def list_tasks(db: Session = Depends(get_db)) -> TaskListResponse:
    tasks = db.scalars(select(Task).order_by(Task.created_at.desc())).all()
    return TaskListResponse(tasks=[TaskRead.model_validate(task) for task in tasks])


@router.post('', response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)) -> TaskRead:
    task = Task(title=payload.title.strip(), description=payload.description.strip(), xp=payload.xp, category=payload.category)
    db.add(task)
    db.commit()
    db.refresh(task)
    return TaskRead.model_validate(task)


@router.patch('/{task_id}/complete', response_model=TaskCompleteResponse)
def complete_task(task_id: str, db: Session = Depends(get_db)) -> TaskCompleteResponse:
    task = db.get(Task, task_id)

    if task is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Diese Aufgabe wurde nicht gefunden.')

    if task.completed:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Diese Aufgabe wurde bereits abgeschlossen.')

    profile = get_or_create_profile(db)
    task.completed = True
    task.completed_at = datetime.now(timezone.utc)
    reward = generate_coin_reward(task.xp)
    apply_reward(profile, reward)
    streak_result = update_streak(profile)
    db.add(task)
    db.add(profile)
    db.commit()
    db.refresh(task)
    db.refresh(profile)

    tasks = db.scalars(select(Task)).all()
    message = motivation_for_task(task, tasks)
    if streak_result.joker_used:
        message = f'Ein Joker hat deinen Streak gerettet! 🎭 {message}'
    if streak_result.streak_milestone:
        message = f'{profile.streak} Tage Streak! Du hast einen neuen Joker verdient. 🔥 {message}'
    return TaskCompleteResponse(
        task=TaskRead.model_validate(task),
        motivation_message=message,
        reward=serialize_reward(reward),
        profile=UserProfileRead.model_validate(serialize_profile(profile)),
        joker_used=streak_result.joker_used,
        streak_milestone=streak_result.streak_milestone,
    )
