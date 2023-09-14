import { useEffect, useState } from 'react'
import { VStack } from '@chakra-ui/react'

import PageViews from './PageViews'
import LinkClicks from './LinkClicks'
import TrafficSources from './TrafficSources'
import TimeSeries from './TimeSeries'

import { AnalyticAPIReturnData } from 'pages/api/analytics/getdata'
import { LANDING_ANALYITCS } from 'consts/landingpage'

const Analyitcs = ({ isExampleEditor }: { isExampleEditor: boolean }) => {
  const [analyticData, setAnalyticData] = useState<AnalyticAPIReturnData | null>(null)

  const hitAPI = async () => {
    const apiResponse = await fetch('/api/analytics/getdata')
    const data = await apiResponse.json()
    setAnalyticData(data)
  }

  useEffect(() => {
    if (analyticData === null && !isExampleEditor) hitAPI()
  }, [])

  return (
    <>
      <VStack align="left" spacing={4}>
        <PageViews
          totalPageViews={isExampleEditor ? LANDING_ANALYITCS.totalHits : analyticData?.totalHits}
        />
        <TimeSeries
          timeSeries={
            isExampleEditor ? LANDING_ANALYITCS.timeSeriesData : analyticData?.timeSeriesData
          }
        />
        <LinkClicks
          totalLinkClicks={isExampleEditor ? LANDING_ANALYITCS.topLinks : analyticData?.topLinks}
        />
        <TrafficSources
          trafficSources={
            isExampleEditor ? LANDING_ANALYITCS.trafficSources : analyticData?.trafficSources
          }
        />
      </VStack>
    </>
  )
}
export default Analyitcs
