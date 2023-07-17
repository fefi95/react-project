import { Box, Button, Flex, Heading, Link, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { type User, authorizationLink, getProfile, getTokenFromURL } from '../services/spotify'
import Profile from '../components/Profile'

const AuthorizationPage = (): JSX.Element => {
  const USER1 = 'USER1'
  const USER2 = 'USER2'

  const getUser = (user: string): User | null => {
    const u1 = localStorage.getItem(user)
    return (u1 != null ? JSON.parse(u1) : null)
  }

  const [user1, setUser1] = useState<User | null>((getUser(USER1) != null) || null)
  const [user2, setUser2] = useState<User | null>((getUser(USER2) != null) || null)

  const setUser = async (token: string, user: string, setUserFunc: React.Dispatch<React.SetStateAction<User | null>>): null => {
    const u1 = await getProfile(token)
    setUserFunc(u1)
    localStorage.setItem(user, JSON.stringify(u1))
  }

  useEffect(() => {
    if (window.location.hash === '') {
      return
    }

    const mToken: any = getTokenFromURL(window.location.hash)
    const u1 = getUser(USER1)
    const u2 = getUser(USER2)

    if (mToken == null && u1 == null) {
      setUser(mToken.access_token, USER1, setUser1)
    } else if (mToken == null && u2 == null) {
      setUser(mToken.access_token, USER2, setUser2)
    }

    window.location.hash = ''
  })

  return (
    <VStack direction="row">
      <Flex alignItems="center" justifyContent="center">
        <Heading as="h1" py="5">Log in to spotify</Heading>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <Box w="25vw" h="50vh" p="5" bg="coral">
          {user1 != null ? <Profile user={user1}></Profile> : <Link href={authorizationLink()} target="popup"><Button>Grant permissions for user 1</Button></Link>}
        </Box>
        <Box w="25vw" h="50vh" p="5" bg="purple">
        {user2 != null ? <Profile user={user2}></Profile> : <Link href={authorizationLink()} target="popup"><Button>Grant permissions for user 2</Button></Link>}
        </Box>
      </Flex>
    </VStack>
  )
}

export default AuthorizationPage
