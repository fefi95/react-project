import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";
import { ChakraProvider } from "@chakra-ui/react";
import LoadingSkeleton from "./components/LoadingSkeleton";

const App = React.lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Suspense fallback={<LoadingSkeleton />}>
        <App />
      </Suspense>
    </ChakraProvider>
  </React.StrictMode>,
);
