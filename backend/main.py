from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import ceo_dashboard, auth_routes

app = FastAPI(title="CEO Dashboard API")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Rotas ---
app.include_router(auth_routes.router)
app.include_router(ceo_dashboard.router)
