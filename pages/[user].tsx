import { getUserFromUsername } from 'controllers/getuser'
import type { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'
import { getBaseURL, getDeviceType } from 'utils/utils'

import User from 'components/PinLink'
import { TUser } from 'types/user'

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
  if (context.query.user?.includes('edit'))
    return { redirect: { destination: '/edit/links', permanent: false } }

  const username = context.query.user?.toString().toLowerCase()

  const { user, error } = await getUserFromUsername(username as string)

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

  const BASE_URL = getBaseURL()
  await fetch(BASE_URL + '/api/analytics/hitpage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinLinkId: user.id,
      deviceType: getDeviceType(context.req.headers['user-agent'] || ''),
      ip: context.req.headers['x-forwarded-for'] || context.req.socket.remoteAddress,
      referrer: context.req.headers.referer,
    }),
  })

  return { props: user }
}
