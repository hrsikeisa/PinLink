import 'styles/globals.css'
import { createContext, ReactElement, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { TUser } from 'types/user'
import { initializePostHog } from 'lib/posthog'
import { dummyPinLinkProd, dummyUser } from 'consts/dummyData'

type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export const UserContext = createContext({})
export const PinLinkProdContext = createContext({})

const App = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter()

  const [user, setUser] = useState<TUser | null>(null)
  const [pinLinkProd, setPinLinkProd] = useState<TUser | null>(null)

  const getUserSession = async () => {
    if (window.location.pathname.includes(`/exampleEditor`)) {
      setUser(dummyUser)
      setPinLinkProd(dummyPinLinkProd)
      console.log(
        '%cUser updated for dummy editor',
        'font-size: 18px; font-weight: bold; color: #ff6600;'
      )
      return
    }
    if (!window.location.pathname.includes(`/edit`)) return
    console.log('%cGetting user session', 'color: white; background-color: black; font-size: 20px')
    const start = new Date().getTime()
    const getuser = await fetch('/api/auth/getuser')
    const { user, publishedPinLink, error } = await getuser.json()

    if (!user || error) {
      console.log('%cNo user found', 'color: white; background-color: black; font-size: 20px')
      return
    }

    setUser(user)
    setPinLinkProd(publishedPinLink)

    console.log(
      `%cUser found in ${new Date().getTime() - start}ms`,
      'color: white; background-color: black; font-size: 20px'
    )
  }

  const initializeExampleEditor = () => {
    if (router.pathname.includes(`exampleEditor`)) {
      setUser(dummyUser)
      setPinLinkProd(dummyPinLinkProd)
      console.log(
        '%cUser updated for dummy editor',
        'font-size: 18px; font-weight: bold; color: #ff6600;'
      )
      return
    }
    return
  }

  useEffect(() => {
    if (user === null) {
      getUserSession()
    }
    initializePostHog()
  }, [])

  useEffect(() => {
    initializeExampleEditor()
  }, [router])

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        {getLayout(
          <UserContext.Provider value={{ user, setUser }}>
            <PinLinkProdContext.Provider value={{ pinLinkProd, setPinLinkProd }}>
              <Component {...pageProps} />
            </PinLinkProdContext.Provider>
          </UserContext.Provider>
        )}
      </ChakraProvider>
    </SessionProvider>
  )
}

export default App
