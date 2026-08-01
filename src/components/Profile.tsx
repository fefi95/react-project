import { Avatar, Badge, Heading, Text, VStack } from "@chakra-ui/react";
import { type User } from "../services/spotify";

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  return (
    <VStack spacing="4" align="center" justify="center" h="full">
      <Avatar
        name={user.username}
        size="2xl"
        src={
          user.photoUrl ||
          `https://placehold.co/400?text=${user.username?.slice(0, 1)}`
        }
        border="4px solid"
        borderColor="white"
        boxShadow="neon"
      />
      <Badge
        bg="accent.100"
        color="accent.800"
        borderRadius="full"
        px="3"
        py="1"
      >
        Connected
      </Badge>
      <Heading as="h2" size="md" textAlign="center">
        {user.username}
      </Heading>
      <Text color="ink.600" fontSize="sm" textAlign="center">
        Profile loaded and ready for compatibility analysis.
      </Text>
    </VStack>
  );
};

export { Profile };
