import asyncio
from passlib.context import CryptContext
from sqlalchemy import select
from database import AsyncSessionLocal
from models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed_admin():
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).where(User.email == "admin@recall.com"))
        existing = result.scalar_one_or_none()

        if existing:
            print("✅ Usuário admin já existe.")
            return

        user = User(
            name="Administrador CEO",
            email="skay.goldszmit@gmail.com",
            password=pwd_context.hash("Recall*2025"),
            role="CEO",
            active=True
        )

        session.add(user)
        await session.commit()
        print("✅ Usuário admin criado com sucesso: admin@recall.com / senha123")

if __name__ == "__main__":
    asyncio.run(seed_admin())
