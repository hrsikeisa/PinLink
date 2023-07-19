import { NextPage } from 'next'

import { HStack, VStack } from '@chakra-ui/react'

import { NextSeo } from 'next-seo'

import LandingLayout from 'components/Layouts/LandingLayout'

import HorizontalScroll from 'components/Landing/HorizontalScroll'
import StarBox from 'components/Landing/StarBox'
import MainContent from 'components/Landing/MainContent'
import ExamplePinLinks from 'components/Landing/ExamplePinLinks'

const Home = () => {
  return (
    <>
      <NextSeo
        title="Pinlink - the link for all your links"
        description="Simple. Fast. Free. Pinlink is a non-bloated link-in-bio tool for anyone, without any hassle or annoyance :)"
        canonical="https://pinlink.com"
      />
      <VStack
        color="black"
        textAlign="center"
        px={{ base: 0, md: 12 }}
        pt={{ base: '3rem', md: '4rem' }}
        spacing={{ base: 16, md: 28 }}
      >
        <HStack w="full" justify="space-between">
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

Home.getLayout = function getLayout(page: NextPage) {
  return <LandingLayout>{page}</LandingLayout>
}
