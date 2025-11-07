import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  Spinner,
  useToast,
  Flex,
  Image,
  Text, // Adicionado Text para o fallback
} from "@chakra-ui/react";
import { Download } from "react-feather";
import axios from "axios";
import TemporalChart from "./charts/TemporalChart";

// O componente Dashboard usa o tema ESCURO
export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const toast = useToast();

  // Tokens fixos (usando as strings do theme.js)
  const bgColor = "recall.greenDark"; // Fundo da tela
  const cardBg = "recall.cardDark";   // Fundo do Card 
  const headingColor = "recall.yellow"; // Cor dos títulos principais (Dourado)
  const subtitleColor = "gray.50";     // Cor do subtítulo do card (Branco/Claro)
  const buttonColorScheme = "teal";    // Esquema de cores do botão

  // --- Funções de Carregamento de Dados (RESTAURADO) ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/ceo-dashboard/dados-temporais", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDados(res.data);
      } catch (err) {
        toast({
          title: "Falha ao Carregar Dados.",
          description: "Tente Novamente. Se o problema persistir, acione o Suporte.",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
      } finally {
        // ESSENCIAL: Chama setLoading(false) para sair da tela de carregamento.
        setLoading(false); 
      }
    };
    fetchData();
  }, []);

  // --- Função de Exportação CSV (RESTAURADA) ---
  const handleExport = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/ceo-dashboard/exportar-csv", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "advogados_snapshot.csv");
      document.body.appendChild(link);
      link.click();
      toast({
        title: "Exportação concluída.",
        description: "Arquivo CSV baixado com sucesso.",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Erro na Exportação CSV.",
        description: "Tente novamente. Acione o Suporte se necessário.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setExporting(false);
    }
  };

  // --- Loading State ---
  if (loading)
    return (
      <Flex justify="center" align="center" minH="100vh" bg={bgColor}>
        <Spinner size="xl" color="recall.yellow" /> {/* Spinner em dourado */}
      </Flex>
    );

  // --- Layout Principal (Tema Escuro) ---
  return (
    <Box minH="100vh" bg={bgColor}>
      
      {/* 1. CABEÇALHO (Logo Retangular e Texto) */}
      <VStack
        w="100%"
        p={4}
        pb={2} 
        bg="recall.greenDark" // Fundo sólido verde escuro
        align="center"
        shadow="lg"
        spacing={1} 
        // Adiciona um padding extra no topo para o cabeçalho não ficar colado
        pt={6} 
      >
        {/* Logo Retangular (SVG) - Adicionando Fallback para diagnóstico */}
        <Image 
          // CAMINHO CORRETO baseado na estrutura de pasta: /logo.svg (dentro da pasta public)
          src="/logo.svg" 
          alt="Recall Logo" 
          maxH="50px" 
          objectFit="contain"
          mb={2} 
          // Fallback visual caso a imagem não carregue, para ajudar no diagnóstico
          fallback={
            <Box h="50px" w="200px" bg="recall.yellow" display="flex" alignItems="center" justifyContent="center" borderRadius="md">
              <Text fontWeight="bold" color="recall.greenDark" fontSize="sm">ERRO LOGO</Text>
            </Box>
          }
          // Log de erro no console para o usuário verificar a raiz do problema (caminho)
          onError={() => console.error("ERRO: Falha ao carregar o logo SVG. Caminho esperado: '/logo.svg'. Por favor, verifique o nome exato e a localização do arquivo na pasta 'public'.")}
        />
        {/* Título "CEO Dashboard" */}
        <Heading size="md" color="white" fontWeight="bold">
          CEO Dashboard
        </Heading>
      </VStack>

      {/* 2. CONTEÚDO PRINCIPAL (Dashboard) */}
      <Box p={8}>
        {/* Título Principal em Dourado */}
        <Heading mb={6} color={headingColor}>
          📈 Evolução Temporal - Advogados Consolidados
        </Heading>

        <VStack align="start" spacing={6}>
          {/* Card do Gráfico (Fundo escuro/diferente) */}
          <Box
            w="100%"
            bg={cardBg} // Cor do card escuro (recall.cardDark)
            p={6}
            borderRadius="lg"
            shadow="xl"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.1)" // Borda sutil e clara
          >
            <Heading size="md" mb={4} color={subtitleColor}>
              Performance Histórica por Categoria
            </Heading>
            <TemporalChart data={dados} />
          </Box>

          {/* Botão de Exportação */}
          <Button
            leftIcon={<Download size={18} />}
            colorScheme={buttonColorScheme}
            onClick={handleExport}
            isLoading={exporting}
            loadingText="Gerando CSV..."
            disabled={exporting}
          >
            Exportar Dados (CSV)
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}