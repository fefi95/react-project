import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ErrorBoundary } from "./components/ErrorBoundary";

interface LayoutProps {
  children: React.ReactElement;
}

const Layout = (props: LayoutProps): JSX.Element => {
  return (
    <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        <Box
          borderRadius="xl"
          bg="whiteAlpha.800"
          border="2px solid"
          borderColor="whiteAlpha.700"
          boxShadow="card"
          px={{ base: 5, md: 8 }}
          py={{ base: 4, md: 6 }}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="-45px"
            right="-60px"
            w="170px"
            h="170px"
            borderRadius="full"
            bg="accent.100"
            opacity={0.7}
          />
          <Heading as="h1" size={{ base: "lg", md: "xl" }}>
            Spotify Match Studio
          </Heading>
          <Text mt="2" color="ink.700" maxW="2xl">
            Compare two Spotify listeners and discover how much their music
            worlds overlap.
          </Text>
        </Box>

        <ErrorBoundary
          fallback={
            <Box
              p="6"
              borderRadius="lg"
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
            >
              <Heading size="md" color="red.700">
                Something failed!
              </Heading>
              <Text mt="2" color="red.600">
                Please refresh and try again.
              </Text>
            </Box>
          }
        >
          {props.children}
        </ErrorBoundary>
      </VStack>
    </Container>
  );
};

export default Layout;
