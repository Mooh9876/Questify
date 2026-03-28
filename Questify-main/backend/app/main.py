from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from .config import get_settings
from .database import Base, SessionLocal, engine
from .routes.ai import router as ai_router
from .routes.tasks import router as tasks_router
from .seed import seed_tasks

settings = get_settings()


def _run_migrations() -> None:
    """Add new columns to existing tables without dropping data."""
    with engine.connect() as conn:
        conn.execute(text('ALTER TABLE tasks ADD COLUMN IF NOT EXISTS completed_at TIMESTAMPTZ'))
        conn.execute(text('ALTER TABLE tasks ADD COLUMN IF NOT EXISTS category VARCHAR(64)'))
        conn.execute(text('ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS streak INTEGER NOT NULL DEFAULT 0'))
        conn.execute(text('ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS last_activity_date DATE'))
        conn.execute(text('ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS jokers INTEGER NOT NULL DEFAULT 0'))
        conn.commit()


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    _run_migrations()
    with SessionLocal() as db:
        seed_tasks(db)
    yield


app = FastAPI(title='Questify API', version='1.0.0', lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok'}


app.include_router(tasks_router, prefix='/api')
app.include_router(ai_router, prefix='/api')
