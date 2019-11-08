import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RemoveRedEye } from '@material-ui/icons'
import { covenantCardsQuery } from 'queries'
import { useStructure } from 'engine'
import { PAYMENT_DESCRIPTION } from 'engine/constants/paymentTypes'
import { covenantListRequest, covenantsUpdatePage } from 'actions/covenants'
import { Pagination, Card, CardHeader, UserAvatar, CardActions, CardInfos, SvgLink, PagesCounter } from 'components'
import Page, { ColumnWrapper, ColumnLeft, ColumnRight, RowWrapper, Empty } from 'templates/PageTemplate'

const Covenant = () => {
  const total = useSelector(state => state.covenants.get('count'))
  const totalPages = useSelector(state => state.covenants.getTotalPages())
  const options = useSelector(state => state.covenants.get('options'))
  const covenants = useSelector(state => state.covenants.get('results'))
  const { ROUTES: { COVENANT }, ENTRY } = useStructure()
  const dispatch = useDispatch()

  const onPageChange = (pageIndex) => () => {
    dispatch(covenantsUpdatePage(pageIndex))
  }

  useEffect(() => {
    const currentPageIndex = options.get('currentPageIndex')
    const limit = options.get('limit')
    const offset = limit * currentPageIndex

    dispatch(covenantListRequest(covenantCardsQuery, limit, offset))
  }, [options])

  return (
    <Page title='Convênios' isFluid={ false }>
      <ColumnWrapper>
        <ColumnLeft>
          <span className='h1'>Convênios</span>
        </ColumnLeft>
      </ColumnWrapper>
      {
        covenants.size > 0 && (
          <>
            <RowWrapper>
              { covenants.map((covenant, i) => {
                const companyName = covenant.getIn(['financeira', 'nome_fantasia'])
                const key = `${ companyName }-${ i }`
                return (
                  <Card key={ key }>
                    <CardHeader>
                      <UserAvatar name={ companyName }>
                        <span className='font-weight-bold'>{ companyName }</span>
                      </UserAvatar>
                    </CardHeader>
                    <CardActions>
                      <SvgLink
                        Icon={ RemoveRedEye }
                        to={ `${ ENTRY }${ COVENANT.URL }/${ covenant.get('id') }` }
                      />
                    </CardActions>
                    <CardInfos>
                      <div>
                        <span className='text-secondary d-block'>
                          Recebimento
                        </span>
                        <span>
                          { PAYMENT_DESCRIPTION[covenant.get('tipo_de_recebimento')] }
                        </span>
                      </div>
                      <div>
                        <span className='text-secondary d-block'>
                          Status
                        </span>
                        <span>
                          { covenant.get('status') }
                        </span>
                      </div>
                    </CardInfos>
                  </Card>
                )
              })
              }
            </RowWrapper>
            <ColumnWrapper>
              <ColumnLeft>
                <Pagination
                  pages={ totalPages }
                  selectedPage={ options.get('currentPageIndex') }
                  onChange={ onPageChange }
                />
              </ColumnLeft>
              <ColumnRight>
                <PagesCounter total={ total } />
              </ColumnRight>
            </ColumnWrapper>
          </>
        )
      }
      {
        covenants.size < 1 && (
          <Empty>
            A consulta não retornou resultados.
          </Empty>
        )
      }
    </Page>
  )
}

export default Covenant
