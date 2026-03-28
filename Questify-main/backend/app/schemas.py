from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

SuggestionCategory = Literal['Uni', 'Haushalt', 'Fitness', 'Gesundheit', 'Alltag']
RewardType = Literal['coins']


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


class RewardRead(BaseModel):
    type: RewardType
    title: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=1, max_length=180)
    coins: int = Field(default=0, ge=0)


class UserProfileRead(BaseModel):
    id: str
    coins: int = Field(ge=0)

    model_config = {'from_attributes': True}


class TaskCompleteResponse(BaseModel):
    task: TaskRead
    motivation_message: str
    reward: RewardRead
    profile: UserProfileRead


class UserProfileResponse(BaseModel):
    profile: UserProfileRead


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
