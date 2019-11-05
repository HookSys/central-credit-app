import React, { Component } from 'react'
import { Edit, Alarm } from '@material-ui/icons'
import Card from 'components/Molecules/Card'
import CardHeader from 'components/Atoms/CardHeader'
import CardActions from 'components/Atoms/CardActions'
import CardInfos from 'components/Atoms/CardInfos'
import Page, { ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'components/Templates/PageTemplate'
import Flexbox from 'components/Atoms/Flexbox'

class Dashboard extends Component {
  render() {
    return (
      <Page>
        <ColumnWrapper>
          <ColumnLeft>
            <span className='h1'>Título</span>
          </ColumnLeft>
          <ColumnRight>
            <button className='btn btn-primary'>Teste</button>
          </ColumnRight>
        </ColumnWrapper>
        <Container>
          <div className='row'>
            <Card>
              <CardHeader>
                <span className='font-weight-bold d-block'>Abidi</span>
                <span>info 2</span>
              </CardHeader>
              <CardActions>
                <Edit />
                <Alarm />
              </CardActions>
              <CardInfos>
                <Flexbox flexColumn={ true }>
                  <span className='text-secondary'> teste </span>
                  <span> outro testestesteste </span>
                </Flexbox>
                <Flexbox flexColumn={ true }>
                  <span className='text-secondary'> teste </span>
                  <span> outro testestesteste </span>
                </Flexbox>
              </CardInfos>
            </Card>
            <Card>
              a
            </Card>
          </div>
        </Container>
      </Page>
    )
  }
}

export default Dashboard
