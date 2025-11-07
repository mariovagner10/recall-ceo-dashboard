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

// Nota: Não é possível usar os tokens do Chakra UI (como theme.colors.graph.blue)
// diretamente no Recharts sem um Hook ou wrapper. Vamos usar as strings literais 
// dos tokens (ou os props de cor do Chakra) para maior compatibilidade.

// As strings das cores do tema Escuro (para referência):
// Fundo do Card: #154e48
// Eixos/Texto: Deve ser claro (e.g., gray.400 ou #bbbbbb)

export default function TemporalChart({ data }) {
  // Mantemos a formatação completa da data
  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("pt-BR", { 
      day: "2-digit", 
      month: "2-digit", 
      year: "numeric"
    });

  const formattedData = data.map((item) => ({
    dia: item.dia ? formatDate(item.dia) : 'N/A',
    "Sem Documento": item.sem_doc,
    "Com CPF": item.com_cpf,
    "Com CNPJ": item.com_cnpj,
  }));

  // Usando os HEX's definidos no theme.js (ou muito próximos)
  const barColor1 = "#3498db"; // graph.blue
  const barColor2 = "#00c49f"; // graph.aqua (ajustado para a cor do exemplo)
  const barColor3 = "#e74c3c"; // graph.dangerBar

  // Cores claras para os eixos (para aparecerem no fundo escuro)
  const axisColor = "#cccccc"; // Cinza claro
  const gridColor = "rgba(255, 255, 255, 0.2)"; // Linhas de grid bem suaves

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ComposedChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
      >
        {/* CORRIGIDO: Grid claro e sutil */}
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke={gridColor} 
        />

        {/* CORRIGIDO: Eixo X e rótulos CLAROS */}
        <XAxis 
          dataKey="dia" 
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }} // Cor do texto do eixo em claro
        />
        
        {/* CORRIGIDO: Eixo Y e rótulos CLAROS */}
        <YAxis 
          stroke={axisColor}
          tick={{ fill: axisColor, fontSize: 12 }} // Cor do texto do eixo em claro
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#2a2a2a", // Mantemos o tooltip escuro com contraste
            border: "1px solid #444",
            borderRadius: "6px",
            color: "#fff",
          }}
        />
        {/* CORRIGIDO: Legenda em cor clara */}
        <Legend wrapperStyle={{ color: axisColor, paddingTop: "10px" }} />

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