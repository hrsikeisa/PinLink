import { Center, HStack, Image } from '@chakra-ui/react'

const ExamplePinLinks = () => {
  const IMAGES = [
    { src: 'https://res.cloudinary.com/harihari/image/upload/v1694395723/apps/pinlink-web/fluyaavplicw081ay519.jpg', username: 'theo' },
  ]
  return (
    <HStack
      pr={12}
      spacing={6}
      display={{ base: 'none', md: 'flex' }}
      _hover={{ opacity: 0.8 }}
      cursor="pointer"
      transitionDuration="300ms"
    >
      {IMAGES.map((image) => (
        <Center
          w={48}
          h="27rem"
          rounded="xl"
          border="3px solid #E2E8F0"
          p={1}
          _hover={{ transform: 'scale(1.01)' }}
          transitionDuration="100ms"
          as="a"
          href={`https://pinlink.com/${image.username}`}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={image.src} alt={`${image.username}'s Pinlink`} rounded="xl" />
        </Center>
      ))}
    </HStack>
  )
}
export default ExamplePinLinks
