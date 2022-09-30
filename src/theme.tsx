import { extendTheme, theme as base } from "@chakra-ui/react";

const fonts = {
  heading: `Open Sans, ${base.fonts.heading}`,
  body: `Open Sans, ${base.fonts.body}`,
};

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "61.25em",
  xl: "80em",
  xxl: "90em",
  sidebarMin: "61.31em",
  sidebarMax: "75em",
};

const theme = extendTheme({
  components: {
    Tooltip: {
      baseStyle: {
        bgColor: "black",
        borderRadius: "0",
        border: "1px solid",
        borderColor: "whiteAlpha.500",
      },
    },
    Button: {
      baseStyle: {
        bgColor: "black",
        border: "1px solid",
        borderColor: "whiteAlpha.500",
        borderRadius: "0",
        color: "white",
      },
      variants: {
        base: {},
        secondary: {
          bgColor: "transparent",
          border: "none",
          borderColor: "none",
          borderRadius: "0",
        },
      },
      defaultProps: {
        variant: "base",
      },
    },
  },
  colors: {
    white: "#fff",
    black: "#1c1d1f",
    black_80: "hsl(220deg 5% 12% / 80%)",
    dark: "#1c1d1f",
    brand: "#47cf73",
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
    grey: {
      50: "#edeff0",
      100: "#d1d7dc",
      200: "#b3bdc5",
      300: "#94a2af",
      400: "#7d8e9d",
      500: "#667a8c",
      600: "#596c7b",
      700: "#495865",
      800: "#3a454f",
      900: "#293138",
    },
    lightGrey: "#f7f9fa",
    darkGrey: "#3e4143",
    cloudGrey: "#6a6f73",
    schemeBlack: {
      400: "#3c3e40",
      500: "#1c1d1f",
      600: "#1c1d1f",
    },
  },
  shadows: {
    outline: "0 0 0 3px #baa5e8",
  },
  fonts,
  breakpoints,
});

export default theme;
