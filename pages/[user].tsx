import { getUserFromUsername } from 'controllers/getuser'
import type { GetServerSideProps } from 'next'
import { NextSeo } from 'next-seo'

import User from 'components/PinLink'
import { TUser } from 'types/user'
import { getDeviceType, getBaseURL } from 'utils/utils'

const PinLink = (user: TUser) => {
  return (
    <>
      <NextSeo
        additionalLinkTags={[
          {
            rel: 'icon',
            href: 'https://pinlink.com/favicon.ico',
          },
        ]}
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

  const BASE_URL = getBaseURL()

  const username = context.query.user?.toString().toLowerCase()

  const { user, error } = await getUserFromUsername(username as string)

  if (!user || error) {
    console.log('LINE 44 ERRORING')
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

  fetch(`${BASE_URL}/api/analytics/hitpage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pinLinkId: user.id,
      deviceType: getDeviceType(context.req.headers['user-agent'] || ''),
      referrer: context.req.headers.referer,
    }),
  })

  return { props: user }
}
