import { NextApiRequest, NextApiResponse } from 'next'

import { getPublishedPinLinkFromId, getUserFromSession } from 'controllers/getuser'
import { TUser } from 'types/user'

type GetUserRes = {
  user?: TUser
  publishedPinLink?: TUser
  error?: string
}

const getuser = async (req: NextApiRequest, res: NextApiResponse<GetUserRes>): Promise<void> => {
  const { user, error } = await getUserFromSession(req)
  if (!user || error) return res.status(400).json({ error })

  const { user: publishedPinLink } = await getPublishedPinLinkFromId(user.id)

  return res.status(200).json({ user, publishedPinLink })
}

export default getuser
