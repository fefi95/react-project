import { Heading, Image, VStack } from "@chakra-ui/react";
import { type User } from "../services/spotify";

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  return (
    <VStack>
      <Image
        borderRadius="full"
        boxSize="100px"
        src={
          user.photoUrl ||
          `https://placehold.co/400?text=${user.username?.slice(0, 1)}`
        }
        alt={user.username}
      />
      <Heading as="h2" py="5">
        {user.username}
      </Heading>
    </VStack>
  );
};

export default Profile;
