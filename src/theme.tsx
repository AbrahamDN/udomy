import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = { mono: `'Open Sans', monospace` };

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: "#1c1d1f",
        _dark: "#fff",
      },
      heroGradientStart: {
        default: "#7928CA",
        _dark: "#e3a7f9",
      },
      heroGradientEnd: {
        default: "#FF0080",
        _dark: "#fbec8f",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#1c1d1f",
    white: "#fff",
    primary: {
      900: "#007121",
      800: "#009135",
      700: "#00a241",
      600: "#00b54d",
      500: "#00c557",
      400: "#47cf72",
      300: "#6fd98c",
      200: "#9ce3ae",
      100: "#c4eece",
      50: "#e6f8eb",
    },
    grey: "#d1d7dc",
    lightGrey: "#f7f9fa",
    darkGrey: "#3e4143",
    cloudGrey: "#6a6f73",
  },
  fonts,
  breakpoints,
});

export default theme;
