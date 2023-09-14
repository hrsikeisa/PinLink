import { VStack } from '@chakra-ui/react'

import { NextSeo } from 'next-seo'

import { useEffect } from 'react'
import { trackClientEvent } from 'lib/posthog'
import { PosthogEvents } from 'consts/posthog'

import LandingFooter from 'components/Landing/LandingFooter'
import LandingAnalytics from 'components/Landing/LandingAnalytics'
import LandingExamples from 'components/Landing/LandingExamples'
import LandingHero from 'components/Landing/LandingHero'
import LandingDemo from 'components/Landing/LandingDemo'

const Home = () => {
  useEffect(() => {
    trackClientEvent({ event: PosthogEvents.HIT_LANDING })
  }, [])
  return (
    <>
      <NextSeo
        title="Pinlink - Simple & Free Link-In-Bio"
        description="Pinlink is an opensource Linktree alternative that allows you to share all your links in one place. Add custom domains, view click statistics and more."
        canonical="https://pinlink.vercel.app"
      />

      <VStack
        minH={{ base: '80vh', lg: '95vh' }}
        justify="space-between"
        spacing={{ base: 20, lg: 48 }}
        mt={{ base: 52, lg: 60 }}
        color="black"
      >
        <LandingHero />

        <LandingDemo />

        <VStack spacing={32}>
          <LandingExamples />
          <LandingAnalytics />
          <LandingFooter />
        </VStack>
      </VStack>
    </>
  )
}

export default Home
