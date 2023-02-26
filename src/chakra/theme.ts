// 1. Import the extendTheme function
import "@fontsource/inter/100.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF5A58",
    },
  },
  fonts: {
    body: "Inter, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});
