import { useEffect } from 'react'
import { getUserFromUsername } from 'controllers/getuser'
import type { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { getDeviceType } from 'lib/utils'

import User from 'components/PinLink'
import { TUser } from 'types/user'
import { AddPageHit } from 'controllers/analytics'

const PinLink = (user: TUser) => {
  useEffect(() => {
    fetch(`/api/analytics/hitpage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pinLinkId: user.id,
        deviceType: getDeviceType(window.navigator.userAgent),
        referrer: window.location.href,
      }),
    })
  }, [])
  return (
    <>
      <NextSeo
        title={`${user.name || user.username} | pinlink`}
        description={`Check out ${user.name || user.username}'s PinLink to grab their links!`}
        canonical={`https://pinlink.com/${user.username}`}
      />
      <User user={user} />
    </>
  )
}

export default PinLink

export const getServerSideProps: GetServerSideProps = async (context) => {
  const start = Date.now()
  if (context.query.user === 'edit')
    return { redirect: { destination: '/edit/links', permanent: false } }

  const username = context.query.user?.toString().toLowerCase()

  const { user, error } = await getUserFromUsername(username as string)

  console.log('Millisecs to get user from DB', Date.now() - start)

  if (!user || error) {
    console.log('error on ssr [user].tsx', error)
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  if (user.shouldRedirect && user.redirectLink) {
    const redirectURL = user.redirectLink.includes('http')
      ? user.redirectLink
      : `https://${user.redirectLink}`
    return {
      redirect: {
        destination: redirectURL,
        permanent: false,
      },
    }
  }

  await AddPageHit({
    pinlinkId: user.id,
    username: user.username || '',
    device: getDeviceType(context.req.headers['user-agent']),
    referrer: context.req.headers.referer || '',
    ip: (context.req.headers['x-forwarded-for'] as string) || context.req.socket.remoteAddress,
  })

  console.log('Millisecs to finish ssr', Date.now() - start)

  return { props: user }
}
