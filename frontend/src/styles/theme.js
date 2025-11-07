import { extendTheme } from "@chakra-ui/theme-utils";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#0f1117",
        color: "#e4e6eb",
      },
    },
  },
  colors: {
    brand: {
      50: "#e3f2ff",
      100: "#b3d4ff",
      200: "#81b7ff",
      300: "#4f9aff",
      400: "#1d7eff",
      500: "#0065e0",
      600: "#004db3",
      700: "#003686",
      800: "#001f59",
      900: "#00092d",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});

export default theme;
