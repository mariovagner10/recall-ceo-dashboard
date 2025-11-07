import React, { useEffect, useState } from "react";
import AdvogadosChart from "../components/charts/AdvogadosChart";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function CeoDashboard() {
  const [data, setData] = useState([]);
  const [loadingCsv, setLoadingCsv] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE}/ceo-dashboard/dados-temporais`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) throw new Error("Sessão expirada");
        return res.json();
      })
      .then((d) => {
        setData(d);
        setLoadingData(false);
      })
      .catch(() => {
        localStorage.removeItem("token");
        window.location.reload();
      });
  }, []);

  const handleExport = () => {
    setLoadingCsv(true);
    fetch(`${API_BASE}/ceo-dashboard/exportar-csv`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `advogados_snapshot_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        setLoadingCsv(false);
      });
  };

  return (
    <div className="min-h-screen bg-dark p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">📈 CEO Dashboard</h1>
        <Button onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}>
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="📊 Evolução Temporal">
          {loadingData ? (
            <p className="text-gray-400 text-center mt-8">Carregando dados...</p>
          ) : (
            <AdvogadosChart data={data} />
          )}
        </Card>

        <Card title="📦 Exportação de Dados">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">
            Baixe o relatório completo dos advogados deduplicados registrados até o momento.
          </p>
          <Button onClick={handleExport} disabled={loadingCsv}>
            {loadingCsv ? "⏳ Gerando CSV..." : "⬇️ Exportar CSV"}
          </Button>
        </Card>
      </div>

      <footer className="text-center text-gray-500 text-xs sm:text-sm mt-10">
        Recall Analytics © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
