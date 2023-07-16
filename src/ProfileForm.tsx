import { Box, Button, Flex, FormControl, Heading, Input } from "@chakra-ui/react"
import { useRef } from "react"

const ProfileForm = (): JSX.Element => {
  const username1 = useRef<HTMLInputElement>(null)
  const username2 = useRef<HTMLInputElement>(null)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username1.current?.value);
    console.log(username2.current?.value);
    // TODO call service or route to another page with the users
  }

  return (
    <Flex alignItems="center" justifyContent="center" h="100vh">
      <Box w="50vw" h="50vh" p="5" bg="coral">
        <form onSubmit={onSubmitHandler}>
          <FormControl>
            <Heading as="h1" py="5">Enter the user's names:</Heading>
            <Input placeholder="First user's name" ref={username1} />
            <Input placeholder="Second user's name" ref={username2} />
            <Button type="submit">Check compatibility!</Button>
          </FormControl>
        </form>
      </Box>
    </Flex>
  )
}

export default ProfileForm
