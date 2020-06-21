import React, { useEffect } from 'react'
import Layout, { ColumnWrapper, ColumnLeft, Title } from 'templates/PageTemplate'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const sellerId = useSelector((state) => state.user.getIn(['data', 'seller', 'id']))
  const funnels = null

  useEffect(() => {
  }, [sellerId])

  if (!funnels || funnels.size === 0) {
    return null
  }

  return (
    <Layout>
      <ColumnWrapper className='mb-2 mt-4'>
        <ColumnLeft>
          <Title>Dashboard</Title>
        </ColumnLeft>
      </ColumnWrapper>
    </Layout>
  )
}

export default Dashboard
