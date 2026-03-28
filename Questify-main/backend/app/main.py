from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text

from .config import get_settings
from .database import Base, SessionLocal, engine
from .routes.ai import router as ai_router
from .routes.tasks import router as tasks_router
from .seed import seed_tasks

settings = get_settings()


def ensure_profile_schema() -> None:
    inspector = inspect(engine)

    if 'user_profiles' not in inspector.get_table_names():
        return

    existing_columns = {column['name'] for column in inspector.get_columns('user_profiles')}

    with engine.begin() as connection:
        if 'rewards' not in existing_columns:
            connection.execute(text("ALTER TABLE user_profiles ADD COLUMN rewards JSON NOT NULL DEFAULT '[]'"))


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)
    ensure_profile_schema()
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
