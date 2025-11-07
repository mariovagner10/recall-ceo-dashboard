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
  // 🧠 Função de formatação da data
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  // 🧮 Acumula os valores progressivamente até cada data
  const formattedData = data.reduce((acc, item, index) => {
    const prev = acc[index - 1] || { "Com CPF": 0, "Com CNPJ": 0, "Sem Documento": 0 };
    const newEntry = {
      dia: item.dia ? formatDate(item.dia) : "N/A",
      "Com CPF": prev["Com CPF"] + (item.com_cpf || 0),
      "Com CNPJ": prev["Com CNPJ"] + (item.com_cnpj || 0),
      "Sem Documento": prev["Sem Documento"] + (item.sem_doc || 0),
    };
    acc.push(newEntry);
    return acc;
  }, []);

  // 🎨 Cores e estilo (modo escuro)
  const barColor1 = "#3498db"; // Azul
  const barColor2 = "#00c49f"; // Verde água
  const barColor3 = "#e74c3c"; // Vermelho
  const axisColor = "#cccccc"; // Texto dos eixos
  const gridColor = "rgba(255, 255, 255, 0.2)"; // Linhas sutis do grid

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        {/* Grade suave */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />

        {/* Eixo X (datas) */}
        <XAxis
          dataKey="dia"
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }}
        />

        {/* Eixo Y (valores) */}
        <YAxis
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }}
        />

        {/* Tooltip dark */}
        <Tooltip
          contentStyle={{
            backgroundColor: "#2a2a2a",
            border: "1px solid #444",
            borderRadius: "6px",
            color: "#fff",
          }}
        />

        {/* Legenda clara */}
        <Legend wrapperStyle={{ color: axisColor, paddingTop: "10px" }} />

        {/* Barras cumulativas */}
        <Bar dataKey="Com CPF" fill={barColor1} barSize={20} />
        <Bar dataKey="Com CNPJ" fill={barColor2} barSize={20} />
        <Bar dataKey="Sem Documento" fill={barColor3} barSize={20} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
