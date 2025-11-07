import { extendTheme } from "@chakra-ui/theme-utils";

const theme = extendTheme({
  config: {
    // Força o modo escuro como padrão para este tema
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors: {
    // Cores da Paleta da Sidebar Escura
    recall: {
      greenDark: "#0d3b36", // Novo Fundo Principal
      green: "#1e684d",     // Verde Escuro (Acento)
      yellow: "#c2a049",    // Dourado/Amarelo (Acentos)
      cardDark: "#154e48",  // Cor para o Card (tom levemente diferente do fundo)
    },
    graph: {
      // Cores vivas para os gráficos
      blue: "#3498db",
      aqua: "#00c49f",
      dangerBar: "#e74c3c",
    },
    brand: {
      50: "#e3f2ff",
      // ...
    },
  },

  styles: {
    global: {
      body: {
        // Altera o fundo global para o verde escuro
        bg: "recall.greenDark", 
        // A cor do texto padrão é clara para contraste
        color: "gray.100", 
      },
      // Estilos globais para títulos em Dourado/Amarelo
      h1: { color: "recall.yellow" },
      h2: { color: "recall.yellow" },
      h3: { color: "recall.yellow" },
      h4: { color: "recall.yellow" },
    },
  },
  
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});

export default theme;