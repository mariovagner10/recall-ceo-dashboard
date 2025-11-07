from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text  # ✅ Import obrigatório para SQL cru
from database import get_db
from auth import verify_token
from fastapi.responses import StreamingResponse
import csv
from io import StringIO
from datetime import datetime

router = APIRouter(
    prefix="/ceo-dashboard",
    tags=["📊 CEO Dashboard"],
    dependencies=[Depends(verify_token)]  # ✅ protege todas as rotas deste grupo
)

# ===========================
# 📊 1️⃣ Dados temporais
# ===========================
@router.get("/dados-temporais")
async def dados_temporais(session: AsyncSession = Depends(get_db)):
    """
    Retorna contagem diária de registros (sem CPF/CNPJ, com CPF e com CNPJ)
    agrupados por data de inserção.
    """
    query = text("""
        SELECT
            date_trunc('day', data_insercao) AS dia,
            COUNT(*) FILTER (WHERE cpf IS NULL AND cnpj IS NULL) AS sem_doc,
            COUNT(*) FILTER (WHERE cpf IS NOT NULL) AS com_cpf,
            COUNT(*) FILTER (WHERE cnpj IS NOT NULL) AS com_cnpj
        FROM advogados_deduplicados_snapshot
        GROUP BY dia
        ORDER BY dia;
    """)
    result = await session.execute(query)
    rows = [dict(r._mapping) for r in result]

    # 🔧 Converte campo dia em string legível pro gráfico
    for r in rows:
        if isinstance(r["dia"], datetime):
            r["dia"] = r["dia"].strftime("%Y-%m-%d")

    return rows



# ===========================
# 📦 2️⃣ Exportar CSV
# ===========================
@router.get("/exportar-csv")
async def exportar_csv(session: AsyncSession = Depends(get_db)):
    query = text("SELECT * FROM advogados_deduplicados_snapshot ORDER BY data_insercao DESC")
    result = await session.execute(query)
    rows = [dict(r._mapping) for r in result]  # ✅ usa ._mapping

    if not rows:
        # CSV vazio amigável
        output = StringIO()
        output.write("mensagem\nNenhum dado encontrado\n")
        output.seek(0)
        return StreamingResponse(
            output,
            media_type="text/csv",
            headers={
                "Content-Disposition": "attachment; filename=advogados_snapshot.csv",
                "Access-Control-Allow-Origin": "*"  # ✅ evita erro CORS
            }
        )

    output = StringIO()
    writer = csv.DictWriter(output, fieldnames=rows[0].keys())
    writer.writeheader()
    writer.writerows(rows)
    output.seek(0)

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={
            "Content-Disposition": "attachment; filename=advogados_snapshot.csv",
            "Access-Control-Allow-Origin": "*"  # ✅ cabeçalho CORS aqui também
        }
    )

