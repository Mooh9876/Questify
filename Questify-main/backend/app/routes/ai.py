from fastapi import APIRouter, HTTPException, status

from ..schemas import (
    RewriteTaskRequest,
    RewriteTaskResponse,
    SuggestTasksRequest,
    SuggestTasksResponse,
    SuggestXpRequest,
    SuggestXpResponse,
)
from ..services import SUGGESTION_MAP, rewrite_task_title, suggest_xp

router = APIRouter(prefix='/ai', tags=['ai'])


@router.post('/suggest-tasks', response_model=SuggestTasksResponse)
def suggest_tasks(payload: SuggestTasksRequest) -> SuggestTasksResponse:
    return SuggestTasksResponse(suggestions=SUGGESTION_MAP[payload.category])


@router.post('/rewrite-task', response_model=RewriteTaskResponse)
def rewrite_task(payload: RewriteTaskRequest) -> RewriteTaskResponse:
    if not payload.input.strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='Bitte gib zuerst eine Aufgabe ein.')
    return RewriteTaskResponse(rewritten=rewrite_task_title(payload.input))


@router.post('/suggest-xp', response_model=SuggestXpResponse)
def suggest_xp_value(payload: SuggestXpRequest) -> SuggestXpResponse:
    return SuggestXpResponse(xp=suggest_xp(payload.title))
