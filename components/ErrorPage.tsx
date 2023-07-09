import { Heading, Link, Text, VStack } from '@chakra-ui/react'

type ErrorPageProps = {
  code: number | string
  message?: string
}

const ErrorPage = ({ code, message }: ErrorPageProps) => {
  return (
    <>
      <VStack bg="purple.200" h="100vh" justifyContent="center" px={4}>
        <VStack px={{ base: 4, md: 40 }} py={12} rounded="2xl" textAlign="center">
          <Heading fontSize={{ base: '3xl', md: '6xl' }}>{code} Error</Heading>

          <Text fontSize={{ base: 'md', md: '2xl' }}>
            {message ?? 'Oh no! Looks like something went wrong :('}
          </Text>
        </VStack>
      </VStack>
    </>
  )
}

export default ErrorPage
