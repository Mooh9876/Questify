from fastapi import APIRouter

from ..schemas import (
    MotivationRequest,
    MotivationResponse,
    RewriteTaskRequest,
    RewriteTaskResponse,
    SuggestTasksRequest,
    SuggestTasksResponse,
    SuggestXpRequest,
    SuggestXpResponse,
)
from ..services import MOTIVATION_MESSAGES, SUGGESTION_MAP, rewrite_task_title, suggest_xp

router = APIRouter(prefix='/ai', tags=['ai'])


@router.post('/suggest-tasks', response_model=SuggestTasksResponse)
def suggest_tasks(payload: SuggestTasksRequest) -> SuggestTasksResponse:
    return SuggestTasksResponse(suggestions=SUGGESTION_MAP[payload.category])


@router.post('/rewrite-task', response_model=RewriteTaskResponse)
def rewrite_task(payload: RewriteTaskRequest) -> RewriteTaskResponse:
    return RewriteTaskResponse(rewritten=rewrite_task_title(payload.input))


@router.post('/suggest-xp', response_model=SuggestXpResponse)
def suggest_xp_value(payload: SuggestXpRequest) -> SuggestXpResponse:
    return SuggestXpResponse(xp=suggest_xp(payload.title))


@router.post('/motivation', response_model=MotivationResponse)
def motivation(payload: MotivationRequest) -> MotivationResponse:
    base_message = MOTIVATION_MESSAGES[(payload.level + payload.xp) % len(MOTIVATION_MESSAGES)]
    return MotivationResponse(message=f'{base_message} Level {payload.level} wartet schon auf dich.')
