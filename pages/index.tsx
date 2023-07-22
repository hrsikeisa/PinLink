import { HStack, VStack } from '@chakra-ui/react'

import { NextSeo } from 'next-seo'

import HorizontalScroll from 'components/Landing/HorizontalScroll'
import StarBox from 'components/Landing/StarBox'
import MainContent from 'components/Landing/MainContent'
import ExamplePinLinks from 'components/Landing/ExamplePinLinks'
import LandingHeader from 'components/Headers/LandingHeader'

const Home = () => {
  return (
    <>
      <NextSeo
        title="Pinlink - the link for all your links"
        description="Simple. Fast. Free. Pinlink is a non-bloated link-in-bio tool for anyone, without any hassle or annoyance :)"
        canonical="https://pinlink.com"
      />

      <VStack minH={{ base: '82vh', md: '95vh' }} justify="space-between">
        <LandingHeader />

        <HStack
          w="full"
          px={{ base: 4, md: 12 }}
          p={4}
          color="black"
          spacing={8}
          justify="space-between"
          textAlign="center"
        >
          <VStack w="lg" align="left" textAlign="left" spacing={6}>
            <StarBox />
            <MainContent />
          </VStack>
          <ExamplePinLinks />
        </HStack>

        <HorizontalScroll />
      </VStack>
    </>
  )
}

export default Home
