import { Heading, VStack } from "@chakra-ui/react";
import ErrorBoundary from "./components/ErrorBoundary";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <>
      <VStack direction="row" p="5">
        <ErrorBoundary fallback={<Heading>Something failed!</Heading>}>
          {props.children}
        </ErrorBoundary>
      </VStack>
    </>
  );
};

export default Layout;
