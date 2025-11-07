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
    Sem_Doc: item.sem_doc,
    Com_CPF: item.com_cpf,
    Com_CNPJ: item.com_cnpj,
  }));

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={formattedData}>
        <XAxis dataKey="dia" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Sem_Doc" stroke="#ff4d4f" />
        <Line type="monotone" dataKey="Com_CPF" stroke="#1677ff" />
        <Line type="monotone" dataKey="Com_CNPJ" stroke="#52c41a" />
      </LineChart>
    </ResponsiveContainer>
  );
}
