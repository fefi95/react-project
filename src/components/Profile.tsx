<<<<<<< HEAD
import { Heading, Image, VStack } from "@chakra-ui/react";
=======
import { Avatar, Heading, VStack } from "@chakra-ui/react";
>>>>>>> origin/TASK-02-get-matching-tracks
import { type User } from "../services/spotify";

interface ProfileProps {
  user: User;
}

const Profile = ({ user }: ProfileProps): JSX.Element => {
  return (
    <VStack>
<<<<<<< HEAD
      <Image
        borderRadius="full"
        boxSize="100px"
=======
      <Avatar
        name={user.username}
        size="2xl"
>>>>>>> origin/TASK-02-get-matching-tracks
        src={
          user.photoUrl ||
          `https://placehold.co/400?text=${user.username?.slice(0, 1)}`
        }
<<<<<<< HEAD
        alt={user.username}
=======
>>>>>>> origin/TASK-02-get-matching-tracks
      />
      <Heading as="h2" py="5">
        {user.username}
      </Heading>
    </VStack>
  );
};

export default Profile;
