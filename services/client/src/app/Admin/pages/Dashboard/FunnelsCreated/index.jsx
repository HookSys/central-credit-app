import React, { useEffect } from 'react'
import Chart from 'components/Chart'
import { useSelector } from 'react-redux'

const FunnelsCreated = () => {
  const sellerId = useSelector((state) => state.user.getIn(['data', 'seller', 'id']))
  const funnels = null

  useEffect(() => {
  }, [sellerId])

  if (!funnels || funnels.size === 0) {
    return null
  }

  return (
    <Chart
      title='Links gerados por dia'
      data={{
        labels: Object.keys(funnels),
        datasets: [{
          label: 'Links',
          backgroundColor: '#DBBC7C',
          data: Object.values(funnels).map((v) => v.length),
          barPercentage: 0.2
        }]
      }}
    />
  )
}

export default FunnelsCreated
