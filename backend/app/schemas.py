from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

SuggestionCategory = Literal['Uni', 'Haushalt', 'Fitness', 'Gesundheit', 'Alltag']


class TaskBase(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    description: str = Field(default='', max_length=500)
    xp: int = Field(ge=5, le=50)


class TaskCreate(TaskBase):
    pass


class TaskRead(TaskBase):
    id: str
    completed: bool
    created_at: datetime

    model_config = {'from_attributes': True}


class TaskListResponse(BaseModel):
    tasks: list[TaskRead]


class TaskCompleteResponse(BaseModel):
    task: TaskRead
    motivation_message: str


class SuggestTasksRequest(BaseModel):
    category: SuggestionCategory


class SuggestTasksResponse(BaseModel):
    suggestions: list[str]


class RewriteTaskRequest(BaseModel):
    input: str = Field(min_length=1, max_length=120)


class RewriteTaskResponse(BaseModel):
    rewritten: str


class SuggestXpRequest(BaseModel):
    title: str = Field(min_length=1, max_length=120)


class SuggestXpResponse(BaseModel):
    xp: int


class MotivationRequest(BaseModel):
    title: str = Field(min_length=1, max_length=120)
    xp: int = Field(ge=5, le=50)
    level: int = Field(ge=1)


class MotivationResponse(BaseModel):
    message: str
