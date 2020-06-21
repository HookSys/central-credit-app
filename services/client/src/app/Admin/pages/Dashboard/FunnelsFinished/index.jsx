import React, { useEffect } from 'react'
import PieChart from 'components/PieChart'
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
    <PieChart
      title='Abertos e Concluídos'
      data={{
        labels: ['Abertos', 'Concluídos'],
        datasets: [{
          label: 'Links',
          backgroundColor: ['#3a3a3a', '#DBBC7C'],
          data: Object.values(funnels).map((v) => v.length),
          barPercentage: 0.2
        }]
      }}
    />
  )
}

export default FunnelsCreated
