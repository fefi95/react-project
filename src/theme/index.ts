import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#fff3d8",
      100: "#ffe6b5",
      200: "#ffd98f",
      300: "#ffcc6a",
      400: "#ffc046",
      500: "#f39b2f",
      600: "#d67d1f",
      700: "#a85d13",
      800: "#7d420f",
      900: "#542909",
    },
    accent: {
      50: "#e8fff9",
      100: "#b9f7e7",
      200: "#89efd5",
      300: "#59e7c4",
      400: "#2adeb2",
      500: "#12c499",
      600: "#0d9a78",
      700: "#097059",
      800: "#05473a",
      900: "#01201c",
    },
    ink: {
      50: "#f6f6f7",
      100: "#e6e7eb",
      200: "#c9ccd4",
      300: "#acb0bc",
      400: "#9095a4",
      500: "#747a8c",
      600: "#5b6070",
      700: "#424754",
      800: "#2b2f38",
      900: "#13161d",
    },
  },
  fonts: {
    heading: "'Trebuchet MS', 'Avenir Next', sans-serif",
    body: "Verdana, 'Segoe UI', sans-serif",
  },
  radii: {
    sm: "8px",
    md: "14px",
    lg: "20px",
    xl: "28px",
    full: "9999px",
  },
  shadows: {
    neon: "0 14px 42px rgba(18, 196, 153, 0.28)",
    card: "0 20px 40px rgba(19, 22, 29, 0.18)",
  },
  styles: {
    global: {
      "html, body, #root": {
        minHeight: "100%",
      },
      body: {
        bg: "#fff6e5",
        color: "ink.900",
        backgroundImage:
          "radial-gradient(circle at 10% 18%, rgba(255, 192, 70, 0.34), transparent 36%), radial-gradient(circle at 90% 0%, rgba(18, 196, 153, 0.22), transparent 32%), linear-gradient(180deg, #fff8ec 0%, #ffe8ca 100%)",
      },
      "*::selection": {
        bg: "brand.300",
        color: "ink.900",
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        color: "ink.900",
        letterSpacing: "-0.02em",
      },
    },
    Button: {
      baseStyle: {
        fontWeight: "700",
        borderRadius: "full",
      },
      variants: {
        solid: {
          bg: "brand.500",
          color: "white",
          boxShadow: "card",
          _hover: {
            bg: "brand.600",
            transform: "translateY(-1px)",
          },
          _active: {
            bg: "brand.700",
            transform: "translateY(0)",
          },
        },
        outline: {
          borderColor: "ink.700",
          color: "ink.800",
          _hover: {
            bg: "whiteAlpha.700",
          },
        },
        ghost: {
          color: "accent.700",
          _hover: {
            bg: "accent.50",
          },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "700",
        color: "accent.700",
        textUnderlineOffset: "4px",
      },
    },
  },
});

export default theme;
