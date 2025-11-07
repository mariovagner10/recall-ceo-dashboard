import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from typing import AsyncGenerator
from dotenv import load_dotenv
from models import Base, User

# --- Carrega variáveis do .env ---
load_dotenv()

# --- Configuração da URL de Conexão ---
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("❌ A variável de ambiente DATABASE_URL não foi definida no arquivo .env")

# --- Cria o engine assíncrono ---
engine = create_async_engine(DATABASE_URL, echo=True)


# ⬇️ IMPORTANTE: importar os models após definir Base
  # ⬅️ adicione aqui (depois de Base!)

# --- Cria a fábrica de sessões ---
AsyncSessionLocal = sessionmaker(
    bind=engine,
    expire_on_commit=False,
    class_=AsyncSession
)

# --- Dependência para FastAPI ---
async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Fornece uma sessão assíncrona do SQLAlchemy para as rotas FastAPI.
    Fecha automaticamente após o uso.
    """
    async with AsyncSessionLocal() as session:
        yield session

# --- Inicialização opcional ---
async def init_db():
    """
    Cria todas as tabelas no banco (se Base.metadata.create_all for usado).
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
