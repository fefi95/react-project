import { Avatar, Heading, VStack } from "@chakra-ui/react";
import { type User } from "../services/spotify";

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  return (
    <VStack>
      <Avatar
        name={user.username}
        size="2xl"
        src={
          user.photoUrl ||
          `https://placehold.co/400?text=${user.username?.slice(0, 1)}`
        }
      />
      <Heading as="h2" py="5">
        {user.username}
      </Heading>
    </VStack>
  );
};

export default Profile;
