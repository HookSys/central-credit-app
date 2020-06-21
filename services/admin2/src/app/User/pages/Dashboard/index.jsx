import React from 'react'
import Layout, { ColumnWrapper, ColumnLeft, Title } from 'templates/PageTemplate'

const Dashboard = () => {
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
