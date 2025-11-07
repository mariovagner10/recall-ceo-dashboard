import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TemporalChart({ data }) {
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  const formattedData = data.map((item) => ({
    dia: formatDate(item.dia),
    "Sem Documento": item.sem_doc,
    "Com CPF": item.com_cpf,
    "Com CNPJ": item.com_cnpj,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        <XAxis dataKey="dia" stroke="#9e9e9e" />
        <YAxis stroke="#9e9e9e" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1a1c23",
            border: "1px solid #333",
            borderRadius: "6px",
          }}
        />
        <Legend wrapperStyle={{ color: "#fff", paddingTop: "10px" }} />

        {/* Linhas mais grossas e mais vivas */}
        <Line
          type="monotone"
          dataKey="Sem Documento"
          stroke="#ff4d4f"
          strokeWidth={4} // <<-- MAIS GROSSA
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Com CPF"
          stroke="#1677ff"
          strokeWidth={4}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="Com CNPJ"
          stroke="#52c41a"
          strokeWidth={4}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
