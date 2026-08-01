import {
  Box,
  Container,
  Grid,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Container maxW="container.lg" py={{ base: 6, md: 10 }}>
      <Stack spacing="6">
        <Box
          borderRadius="xl"
          bg="whiteAlpha.800"
          border="2px solid"
          borderColor="whiteAlpha.700"
          boxShadow="card"
          px={{ base: 5, md: 8 }}
          py={{ base: 4, md: 6 }}
        >
          <Heading as="h1" size={{ base: "lg", md: "xl" }}>
            Spotify Match Studio
          </Heading>
          <Text mt="2" color="ink.700" maxW="2xl">
            Compare two Spotify listeners and discover how much their music
            worlds overlap.
          </Text>
        </Box>

        <Box
          p={{ base: 5, md: 6 }}
          borderRadius="xl"
          bg="rgba(255, 255, 255, 0.85)"
          border="2px solid"
          borderColor="brand.200"
          boxShadow="card"
        >
          <Skeleton height="34px" maxW="260px" borderRadius="md" />
          <SkeletonText mt="4" noOfLines={2} spacing="3" skeletonHeight="3" />

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap="5"
            mt="5"
          >
            {[0, 1].map((slot) => (
              <Box
                key={slot}
                p={{ base: 5, md: 6 }}
                borderRadius="xl"
                bg="whiteAlpha.900"
                border="2px solid"
                borderColor={slot === 0 ? "brand.200" : "accent.200"}
                minH="320px"
              >
                <Skeleton height="14px" maxW="92px" borderRadius="md" />
                <Stack spacing="4" mt="8" align="center">
                  <SkeletonCircle size="24" />
                  <Skeleton height="12px" w="160px" borderRadius="full" />
                  <Skeleton height="44px" w="100%" borderRadius="full" />
                </Stack>
              </Box>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};
export { LoadingSkeleton };
