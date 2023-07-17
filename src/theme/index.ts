import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

const theme = extendTheme({ config });

export default theme;

// export const theme = extendTheme({
//     colors: {
//       background: {
//         primary: "#0F3460",
//         secondary: "#73B4B3"
//       },
//       cta: {
//         primary: "#75E6DA"
//       },
//       font: {
//         navbar: "#6AF2F0",
//         primary: "#B3D8E0",
//         secondary: "#C3E0E5"
//       },
//       info: {
//         primary: "#059DC0",
//         secondary: "#41729F"
//       },
//       navbar: {
//         item: {
//           hover: "#274472",
//           primary: "#6AF2F0"
//         },
//         primary: "#0D2A4D"
//       },
//       skills: {
//         first: "#78C7E2",
// }
