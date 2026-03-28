from datetime import date, datetime, timezone
import uuid

from sqlalchemy import Boolean, Date, DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class Task(Base):
    __tablename__ = 'tasks'

    id: Mapped[str] = mapped_column(String(64), primary_key=True, default=lambda: f'task-{uuid.uuid4()}')
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False, default='')
    xp: Mapped[int] = mapped_column(Integer, nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True, default=None)
    category: Mapped[str | None] = mapped_column(String(64), nullable=True, default=None)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))


class UserProfile(Base):
    __tablename__ = 'user_profiles'

    id: Mapped[str] = mapped_column(String(64), primary_key=True, default='player-1')
    coins: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    streak: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default='0')
    last_activity_date: Mapped[date | None] = mapped_column(Date, nullable=True, default=None)
    jokers: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default='0')
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))
