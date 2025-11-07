import { useState } from "react";
import {
  Box,
  VStack,
  Input,
  Button,
  Heading,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/auth/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      toast({
        title: "Login bem-sucedido!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.800"
    >
      <VStack spacing={4} bg="gray.700" p={8} rounded="xl" shadow="lg">
        <Heading size="lg" color="brand.500">
          CEO Dashboard
        </Heading>
        <Input
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          w="full"
          colorScheme="blue"
          onClick={handleLogin}
          isDisabled={loading}
        >
          {loading ? <Spinner /> : "Entrar"}
        </Button>
        <Text fontSize="sm" color="gray.400">
          Recall Analytics © 2025
        </Text>
      </VStack>
    </Box>
  );
}
