import { NextApiRequest, NextApiResponse } from 'next'

import {
  GetCountryHits,
  GetCountryHitsReturnData,
  GetDeviceHits,
  GetDeviceHitsReturnData,
  GetLinkHits,
  GetLinkHitsReturnData,
  GetPageHits,
  GetPageHitsReturnData,
  GetTimeSeriesData,
  GetTrafficSources,
  GetTrafficSourcesReturnData,
} from 'controllers/analytics'

import { getUserFromNextAuth } from 'controllers/getuser'

export type AnalyticAPIReturnData = {
  success?: boolean
  error?: string
  totalHits?: GetPageHitsReturnData
  topLinks?: GetLinkHitsReturnData
  topCountries?: GetCountryHitsReturnData
  topDevices?: GetDeviceHitsReturnData
  trafficSources?: GetTrafficSourcesReturnData
  timeSeriesData?: any
}

const handler = async (req: NextApiRequest, res: NextApiResponse<AnalyticAPIReturnData>) => {
  const { user } = await getUserFromNextAuth(req, res)
  if (!user) return res.status(400).json({ error: 'No user found' })

  const pinlinkId = user.id

  console.log('/api/analytics/getdata hit for:', pinlinkId)

  const totalHits = await GetPageHits(pinlinkId)

  const topLinks = await GetLinkHits(pinlinkId)

  const topCountries = await GetCountryHits(pinlinkId)

  const topDevices = await GetDeviceHits(pinlinkId)

  const topTrafficSources = await GetTrafficSources(pinlinkId)

  const timeSeriesData = await GetTimeSeriesData(pinlinkId)

  return res.status(200).json({
    success: true,
    totalHits,
    topLinks,
    topCountries,
    topDevices,
    trafficSources: topTrafficSources,
    timeSeriesData,
  })
}

export default handler
