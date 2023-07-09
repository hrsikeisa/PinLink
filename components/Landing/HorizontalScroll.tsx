import { Heading, HStack, Stack, Text, VStack, useBreakpointValue } from '@chakra-ui/react'
import Image from 'next/image'

const HorizontalScroll = () => {
  const names = [
    {
      name: 'theo',
      pfp: 'https://res.cloudinary.com/harihari/image/upload/v1694395723/apps/pinlink-web/fluyaavplicw081ay519.jpg',
      color: 'purple.200',
      link: 'https://pinlink.com/theo',
    },
    // todo add more
  ]
  const names2 = [
    {
      name: 'theo',
      pfp: 'https://res.cloudinary.com/harihari/image/upload/v1694395723/apps/pinlink-web/fluyaavplicw081ay519.jpg',
      color: 'purple.200',
      link: 'https://pinlink.com/theo',
    },
    // todo add more
  ]
  const Names2Duplicated = [...names2, ...names2, ...names2, ...names2]
  const NamesDuplicated = [...names, ...names, ...names, ...names]

  const imageSize = useBreakpointValue({ base: 32, md: 40 })
  return (
    <VStack pt={{ base: 24, md: 8 }} pb={14}>
      <Stack direction={{ base: 'column', md: 'row' }} textAlign="center" spacing={2} pb={12}>
        <Heading fontSize={{ base: '4xl', md: '5xl' }} color="black">
          Join the
        </Heading>
        <Heading px={1} bg="purple.200" fontSize={{ base: '4xl', md: '5xl' }} fontWeight="black">
          countless others
        </Heading>
        <Heading fontSize={{ base: '4xl', md: '5xl' }} color="black">
          using PinLink
        </Heading>
      </Stack>
      <div className="container">
        {NamesDuplicated.map((name, index) => {
          return (
            <HStack rounded="md" bg={name.color} key={index} spacing={4} w="fit" h="1" p={3}>
              <Image
                src={name?.pfp}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                height={imageSize}
                width={imageSize}
              />
              <Text fontSize="sm" color="black">
                {name.name}
              </Text>
            </HStack>
          )
        })}
      </div>
      <div className="container2">
        {Names2Duplicated.map((name, index) => {
          return (
            <HStack rounded="md" bg={name.color} key={index} spacing={4} w="fit" p={4}>
              <Image
                src={name?.pfp}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
                height={imageSize}
                width={imageSize}
              />
              <Text fontSize="sm" color="black">
                {name.name}
              </Text>
            </HStack>
          )
        })}
      </div>
    </VStack>
  )
}
export default HorizontalScroll
