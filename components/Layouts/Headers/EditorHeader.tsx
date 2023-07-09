import { useCallback, useContext, useEffect, useState } from 'react'
import { debounce, isEqual, omit } from 'lodash'
import { signOut } from 'next-auth/react'

import {
  Text,
  Spacer,
  Avatar,
  HStack,
  Container,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Portal,
  PopoverCloseButton,
  PopoverBody,
  Link,
  VStack,
  Button,
  useToast,
} from '@chakra-ui/react'

import { TPublishedPinLinkContext, TUser } from 'types/user'
import SharePinLinkModal from 'components/Modals/SharePinLinkModal'
import { PublishedPinLinkContext } from 'pages/_app'

const EditorHeader = ({ user }: { user: TUser | null }) => {
  const { publishedPinLink } = useContext(PublishedPinLinkContext) as TPublishedPinLinkContext
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [saveState, setSaveState] = useState('')

  const logout = () => {
    signOut({ callbackUrl: '/' })
  }

  const publishPinLink = async () => {
    setSaveState('saving')
    await fetch('/api/publishpinlink')
    setSaveState('saved')
    toast({ title: 'PinLink published!', status: 'success', duration: 3000 })
  }

  const autoSave = async (userData: TUser) => {
    await fetch('/api/updatepinlink', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        draftData: userData,
      }),
    })
    setSaveState('unsaved')
  }

  const debouncedAutoSave = useCallback(
    debounce((user) => autoSave(user), 200),
    []
  )

  const checkChanges = () => {
    const published = omit(publishedPinLink, ['createdAt', 'isNewUser'])
    const draft = omit(user, ['createdAt', 'isNewUser'])

    if (!isEqual(published, draft)) {
      debouncedAutoSave(user)
    } else {
      setSaveState('saved')
    }
  }

  useEffect(() => {
    if (!user || !publishedPinLink) return
    checkChanges()
  }, [user, publishedPinLink])

  return (
    <>
      <HStack
        position="fixed"
        w="full"
        top={0}
        left={0}
        zIndex={100}
        bgColor="white"
        borderBottom="1px"
        borderColor="gray.200"
        justifyContent="center"
        as="nav"
        h="72px"
        px={7}
      >
        <Container maxW="container.2xl" px={{ base: 0, md: 8 }}>
          <SimpleGrid
            columns={3}
            w="full"
            alignItems="center"
            px={{
              base: 4,
              md: 0,
            }}
          >
            <Text
              onClick={() => (window.location.href = '/')}
              cursor="pointer"
              fontSize={{ base: '2xl', md: '4xl' }}
            >
              📌 
            </Text>
            <Spacer />
            <HStack spacing={4} justifyContent="flex-end">
              <HStack spacing={1}>
                <Link
                  fontSize={{ base: 'xs', md: 'md' }}
                  width={{ base: '7rem', md: 'full' }}
                  onClick={publishPinLink}
                >
                  {saveState === 'saved' && 'Published! 🎉'}
                  {saveState === 'saving' && 'Publishing...'}
                  {saveState === 'unsaved' && 'Click to publish 🌍'}
                  {!saveState && 'Checking for changes...'}
                </Link>
              </HStack>
              <Button
                _hover={{ bg: 'gray.100' }}
                h={{ base: '28px', md: '35px' }}
                fontSize={{ base: 'xs', md: 'md' }}
                _focus={{ outline: 'none' }}
                py={0}
                px={6}
                bg="white"
                border="1px"
                onClick={() => setModalOpen(true)}
              >
                Share
              </Button>
              <SharePinLinkModal
                username={user?.username}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />

              <Popover trigger="hover">
                <PopoverTrigger>
                  <Avatar
                    bg="gray.300"
                    cursor="pointer"
                    w={10}
                    h={10}
                    name={user?.name}
                    src={user?.pfp}
                  />
                </PopoverTrigger>
                <Portal>
                  <PopoverContent
                    mt={4}
                    mr={{ base: 2, md: 16 }}
                    pr={20}
                    w="fit"
                    _focus={{ outline: 'none' }}
                  >
                    <PopoverCloseButton _focus={{ outline: 'none' }} />
                    <PopoverBody _focus={{ outline: 'none' }} display="block">
                      <VStack align="left" w="fit">
                        <Link onClick={() => window.open(`/${user?.username}`)} colorScheme="blue">
                          View Profile
                        </Link>
                        <Link onClick={logout} colorScheme="blue">
                          Log out
                        </Link>
                      </VStack>
                    </PopoverBody>
                  </PopoverContent>
                </Portal>
              </Popover>
            </HStack>
          </SimpleGrid>
        </Container>
      </HStack>
    </>
  )
}

export default EditorHeader
