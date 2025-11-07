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
          title: "Erro ao carregar dados",
          status: "error",
          duration: 3000,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleExport = async () => {
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
    } catch (err) {
      toast({
        title: "Erro ao exportar CSV",
        status: "error",
        duration: 3000,
      });
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
      <Heading mb={6}>📊 CEO Dashboard</Heading>

      <VStack align="start" spacing={6}>
        <Box w="100%">
          <Heading size="md" mb={3}>
            Evolução Temporal
          </Heading>
          <TemporalChart data={dados} />
        </Box>

        <Button
          leftIcon={<Download size={18} />}
          colorScheme="blue"
          onClick={handleExport}
        >
          Exportar CSV
        </Button>
      </VStack>
    </Box>
  );
}
