import React, { Fragment, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BaseUrl } from 'configs'
import Button from 'components/Button'
import { ToastContext } from 'components/ToastProvider'
import Cards, { Card, CardRow, CardTitle, CardContent, CardInfo, CardAction } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, Title, Container } from 'templates/PageTemplate'
import Pagination from 'components/Pagination'
import { bindPathParams } from 'helpers'
import FunnelsSidePanel from 'user/pages/Funnels/SidePanel'
import FunnelsSearchForm from 'user/components/FunnelsSearchForm'

export const total = 20

const FunnelsList = ({ parent, profile: { pages: profilePages } }) => {
  const { showSuccessToast } = useContext(ToastContext)
  const funnels = useSelector(({ seller }) => seller.funnels.get('results'))
  const options = useSelector(({ seller }) => seller.funnels.get('options'))
  const pages = useSelector(({ seller }) => seller.funnels.getTotalPages())
  const selectedPage = options.get('currentPageIndex')
  const history = useHistory()

  const requestFunnelsList = useCallback(() => {
  }, [])

  const onChange = useCallback(() => {
  }, [])

  useEffect(() => {
  }, [selectedPage])

  const onPageChange = useCallback(() => async () => {
  }, [])

  const onFunnelClick = useCallback((funnel) => () => {
    const route = bindPathParams({
      funnelId: funnel.get('id')
    }, profilePages.FUNNELS.VIEW)
    history.push(route)
  }, [])

  const onCopyLinkFunnel = useCallback((funnel) => (event) => {
    event.stopPropagation()
    navigator.clipboard.writeText(`${BaseUrl}/${funnel.get('token')}`).then(() => {
      showSuccessToast({
        message: 'Link copiado para o clipboard!'
      })
    })
  }, [])

  return (
    <Fragment>
      <FunnelsSidePanel
        pages={profilePages.FUNNELS}
        routes={parent.routes}
        onChange={onChange}
      />
      <FunnelsSearchForm requestFunnelsList={requestFunnelsList} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Lista de Clientes</Title>
        </ColumnLeft>
      </ColumnWrapper>
      <Container>
        { funnels.size > 0 ? (
          <Cards>
            { funnels.map((funnel) => {
              const customers = funnel.get('customer')
              const percent = (parseInt(funnel.get('currentQuestion'), 10) * 100) / total
              return (
                <Card
                  key={funnel.get('id')}
                  onClick={onFunnelClick(funnel)}
                >
                  <CardRow>
                    <CardTitle isAvatarVisible={true}>
                      { customers.getFullName() }
                    </CardTitle>
                    <CardAction>
                      <Button className='btn btn-light btn-sm' onClick={onCopyLinkFunnel(funnel)}>
                        Copiar Link
                      </Button>
                    </CardAction>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Gerado em'>
                      { funnel.getFormatedDate('createdAt') }
                    </CardInfo>
                    <CardInfo title='Andamento'>
                      { funnel.get('hasFinished') ? (
                        <strong className='text-green'>Finalizado</strong>
                      ) : (
                        <strong className='text-danger'>{ `Completou ${percent >= 0 ? funnel.getFormatedPercent(percent) : '0%'}` }</strong>
                      )}
                    </CardInfo>
                  </CardContent>
                </Card>
              )
            }) }
          </Cards>
        ) : (
          <div>
            Sem resultados
          </div>
        )}
      </Container>
      <ColumnWrapper>
        <ColumnLeft>
          <Pagination
            pages={pages}
            selectedPage={selectedPage}
            onChange={onPageChange}
          />
        </ColumnLeft>
      </ColumnWrapper>
    </Fragment>
  )
}

FunnelsList.propTypes = {
  profile: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired
}

export default React.memo(FunnelsList)
