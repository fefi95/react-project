import { Box, SkeletonText } from "@chakra-ui/react";

const LoadingSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" margin="auto" maxWidth="50vw">
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="4" />
    </Box>
  );
};
export default LoadingSkeleton;
