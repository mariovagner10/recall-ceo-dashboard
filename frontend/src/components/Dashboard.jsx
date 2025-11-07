import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Button,
  VStack,
  Spinner,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { Download } from "react-feather";
import axios from "axios";
import TemporalChart from "./charts/TemporalChart";

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false); // ✅ novo estado
  const toast = useToast();

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
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
    setExporting(true); // ✅ trava botão
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
      setExporting(false); // ✅ destrava botão
    }
  };

  if (loading)
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" />
      </Flex>
    );

  return (
    <Box p={8}>
      <Heading mb={6}>📈 Evolução Temporal - Advogados Consolidados</Heading>

      <VStack align="start" spacing={6}>
        <Box
          w="100%"
          bg="gray.800"
          p={6}
          borderRadius="lg"
          shadow="xl"
          border="1px solid"
          borderColor="gray.700"
        >
          <Heading size="md" mb={4} color="gray.100">
            Performance Histórica
          </Heading>
          <TemporalChart data={dados} />
        </Box>

        <Button
          leftIcon={<Download size={18} />}
          colorScheme="blue"
          onClick={handleExport}
          isLoading={exporting} // ✅ spinner automático
          loadingText="Gerando CSV..." // ✅ texto no spinner
          disabled={exporting}
        >
          Exportar Dados (CSV)
        </Button>
      </VStack>
    </Box>
  );
}
