import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import EditorHeader from 'components/Headers/EditorHeader'
import LoadingScreen from 'components/Auth/LoadingScreen'

import { TPinLinkProdContext, TUser, TUserContext } from 'types/user'
import { PinLinkProdContext, UserContext } from 'pages/_app'
import NoUserScreen from 'components/Auth/NoUserScreen'
import { NextSeo } from 'next-seo'
import Editor from 'components/Editor'
import { trackClientEvent } from 'lib/posthog'
import { PosthogEvents } from 'consts/posthog'

const Edit = () => {
  const { user, setUser } = useContext(UserContext) as TUserContext
  const { pinLinkProd } = useContext(PinLinkProdContext) as TPinLinkProdContext

  const router = useRouter()
  const [route, setRoute] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    trackClientEvent({ event: PosthogEvents.HIT_EDIT, id: user?.id })
  }, [])

  useEffect(() => {
    if (router.query.edit && router.query.edit.length > 2) {
      setRoute(router.query.edit as string)
    }

    const timer = setTimeout(() => {
      if (!user) setError(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [router.query.edit])

  if (error && !user) return <NoUserScreen />
  if (route === null || !user) return <LoadingScreen />

  return (
    <>
      <NextSeo title="PinLink | Edit" />
      <EditorHeader user={user} />
      <Editor user={user} setUser={setUser} pinLinkProd={pinLinkProd as TUser} route={route} />
    </>
  )
}

export default Edit
