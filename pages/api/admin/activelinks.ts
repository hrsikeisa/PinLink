import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const threeDaysAgo = new Date()
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

  const activePinLinks = await prisma.pinLinkProd.findMany({
    where: {
      OR: [
        {
          pageHits: {
            some: {
              timestamp: {
                gte: threeDaysAgo,
              },
            },
          },
        },
        {
          linkHits: {
            some: {
              timestamp: {
                gte: threeDaysAgo,
              },
            },
          },
        },
      ],
    },
    select: {
      name: true,
      pageHits: {
        where: {
          timestamp: {
            gte: threeDaysAgo,
          },
        },
        select: {
          id: true,
        },
      },
    },
  })

  const activePinLinksData = activePinLinks.map((pinLink) => ({
    name: pinLink.name,
    totalPageHits: pinLink.pageHits.length,
  }))

  // Sort by totalPageHits in descending order
  activePinLinksData.sort((a, b) => b.totalPageHits - a.totalPageHits)

  const count = activePinLinksData.length

  return res.status(200).json({ count, activePinLinksData })
}

export default handler
