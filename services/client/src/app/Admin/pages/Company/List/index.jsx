import React, { Fragment, useEffect, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cards, { Card, CardRow, CardAction, CardTitle, CardContent, CardInfo } from 'components/Cards'
import { ColumnWrapper, ColumnLeft, ColumnRight, Title, Container } from 'templates/PageTemplate'
import { companiesAsyncRequest, companySyncAsyncRequest, companiesSyncAsyncRequest, companiesUpdatePage, companiesUpdateFilters } from 'admin/actions/companies'
import Button from 'components/Button'
import Pagination from 'components/Pagination'
import { bindPathParams } from 'helpers'
import CompaniesSidePanel from 'admin/pages/Company/SidePanel'
import CompaniesSearchForm from 'admin/components/CompaniesSearchForm'
import { ToastContext } from 'components/ToastProvider'

const CompaniesList = ({ parent, profile: { pages: profilePages } }) => {
  const dispatch = useDispatch()
  const { showSuccessToast } = useContext(ToastContext)
  const companies = useSelector(({ admin }) => admin.companies.get('results'))
  const options = useSelector(({ admin }) => admin.companies.get('options'))
  const pages = useSelector(({ admin }) => admin.companies.getTotalPages())
  const selectedPage = options.get('currentPageIndex')
  const history = useHistory()

  const requestCompaniesList = useCallback(() => {
    dispatch(companiesAsyncRequest(true))
  }, [])

  const onChange = useCallback(() => {
    dispatch(companiesUpdateFilters(''))
  }, [])

  useEffect(() => {
    requestCompaniesList()
  }, [selectedPage])

  const onPageChange = useCallback((page) => async () => {
    dispatch(companiesUpdatePage(page))
  }, [])

  const onCompanyClick = useCallback((company) => () => {
    const route = bindPathParams({
      companyId: company.get('id')
    }, profilePages.COMPANIES.EDIT)
    history.push(route)
  }, [])

  const onSyncCompany = useCallback((company = null) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (company) {
      dispatch(companySyncAsyncRequest(company.get('code'))).then(() => {
        dispatch(companiesAsyncRequest(true)).then(() => {
          showSuccessToast({
            message: 'Empresa sincronizada com sucesso!'
          })
        })
      })
    } else {
      dispatch(companiesSyncAsyncRequest()).then(() => {
        dispatch(companiesAsyncRequest(true)).then(() => {
          showSuccessToast({
            message: 'Sincronizada com sucesso!'
          })
        })
      })
    }
  }, [])

  return (
    <Fragment>
      <CompaniesSidePanel
        pages={profilePages.COMPANIES}
        routes={parent.routes}
        onChange={onChange}
      />
      <CompaniesSearchForm requestCompaniesList={requestCompaniesList} />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Lista de empresas</Title>
        </ColumnLeft>
        <ColumnRight>
          <Button disabled={companies.size === 0} onClick={onSyncCompany()}>
            Sincronizar Todos
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container>
        { companies.size > 0 ? (
          <Cards>
            { companies.map((company) => {
              return (
                <Card
                  key={company.get('id')}
                  onClick={onCompanyClick(company)}
                >
                  <CardRow>
                    <CardTitle isAvatarVisible={true}>
                      { company.get('name') }
                    </CardTitle>
                    <CardAction>
                      <Button className='btn btn-light btn-sm' onClick={onSyncCompany(company)}>
                        Sincronizar
                      </Button>
                    </CardAction>
                  </CardRow>
                  <CardContent>
                    <CardInfo title='Títulos'>
                      { `${company.get('totalTitulos')} itens` }
                    </CardInfo>
                    <CardInfo title='Cedentes'>
                      { `${company.get('totalCedentes')} itens` }
                    </CardInfo>
                    <CardInfo title='Sacados'>
                      { `${company.get('totalSacados')} itens` }
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

CompaniesList.propTypes = {
  profile: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired
}

export default React.memo(CompaniesList)
