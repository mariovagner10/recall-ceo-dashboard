import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TemporalChart({ data }) {
  // Apenas esta função é alterada para garantir o formato dia/mês/ano
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric" // Adiciona o ano completo (e.g., 2025)
    });

  const formattedData = data.map((item) => ({
    dia: formatDate(item.dia),
    "Sem Documento": item.sem_doc,
    "Com CPF": item.com_cpf,
    "Com CNPJ": item.com_cnpj,
  }));

  // Cores personalizadas inspiradas na imagem e no seu tema
  const barColor1 = "#3498db"; // Azul
  const barColor2 = "#2ecc71"; // Verde-água
  const barColor3 = "#e74c3c"; // Vermelho Suave

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />

        {/* O eixo X agora exibirá dia/mês/ano completo */}
        <XAxis 
          dataKey="dia" 
          stroke="#555555"
          tick={{ fill: "#555555" }}
        />
        <YAxis 
          stroke="#555555"
          tick={{ fill: "#555555" }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "6px",
            color: "#fff",
          }}
        />
        <Legend wrapperStyle={{ color: "#ffffff", paddingTop: "10px" }} />

        {/* 1. BARRA: Com CPF (Azul) */}
        <Bar
          dataKey="Com CPF"
          fill={barColor1}
          barSize={20}
        />
        
        {/* 2. BARRA: Com CNPJ (Verde-água) */}
        <Bar
          dataKey="Com CNPJ"
          fill={barColor2}
          barSize={20}
        />
        
        {/* 3. BARRA: Sem Documento (Vermelho) */}
        <Bar
          dataKey="Sem Documento"
          fill={barColor3}
          barSize={20}
        />
        
      </ComposedChart>
    </ResponsiveContainer>
  );
}