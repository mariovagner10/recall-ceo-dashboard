# Usa uma imagem leve do Python
FROM python:3.11-slim

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências de sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copia o código do backend
COPY . .

# Instala as dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta padrão do Uvicorn
EXPOSE 8000

# Inicia o servidor FastAPI com auto-reload (para desenvolvimento)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
