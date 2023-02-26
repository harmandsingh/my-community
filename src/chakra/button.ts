import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "gray.600",
      _hover: {
        bg: "red.400",
      },
    },
    outline: {
      color: "gray.600",
      border: "1px solid",
      borderColor: "gray.600",
      _hover: {
        bg: "gray.600",
        color: "white",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.600",
      _hover: {
        bg: "red.400",
      },
    },
  },
};
