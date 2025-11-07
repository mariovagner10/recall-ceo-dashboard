from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext
from database import get_db
from models import User
from auth import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/login")
async def login(data: dict, db: AsyncSession = Depends(get_db)):
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Usuário e senha obrigatórios")

    print(f"🔍 Tentando login com: {username}")

    result = await db.execute(select(User).where(User.email == username))
    user = result.scalar_one_or_none()

    if not user:
        print("❌ Usuário não encontrado")
        raise HTTPException(status_code=401, detail="Usuário não encontrado")

    if not pwd_context.verify(password, user.password):
        print("❌ Senha incorreta")
        raise HTTPException(status_code=401, detail="Senha incorreta")

    token = create_access_token({"sub": user.email})
    print(f"✅ Login bem-sucedido: {user.email}")
    return {"access_token": token, "token_type": "bearer"}
