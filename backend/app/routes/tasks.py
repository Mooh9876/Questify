from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Task
from ..schemas import TaskCompleteResponse, TaskCreate, TaskListResponse, TaskRead
from ..services import motivation_for_task

router = APIRouter(prefix='/tasks', tags=['tasks'])


@router.get('', response_model=TaskListResponse)
def list_tasks(db: Session = Depends(get_db)) -> TaskListResponse:
    tasks = db.scalars(select(Task).order_by(Task.created_at.desc())).all()
    return TaskListResponse(tasks=[TaskRead.model_validate(task) for task in tasks])


@router.post('', response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)) -> TaskRead:
    task = Task(title=payload.title.strip(), description=payload.description.strip(), xp=payload.xp)
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

    task.completed = True
    db.add(task)
    db.commit()
    db.refresh(task)

    tasks = db.scalars(select(Task)).all()
    message = motivation_for_task(task, tasks)
    return TaskCompleteResponse(task=TaskRead.model_validate(task), motivation_message=message)
