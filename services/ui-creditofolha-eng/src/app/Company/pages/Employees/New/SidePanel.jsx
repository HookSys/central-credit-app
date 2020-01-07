import React, { useMemo, useCallback, useContext } from 'react'
import PropTypes from 'prop-types'
import { useStructure } from 'hooks'
import SidePanelTemplate from 'templates/SidePanelTemplate'
import SidePanelRender from 'components/SidePanelRender'
import { ContentContext } from 'templates/ModuleTemplate/Content'

const { Layout, Header, Title, BackLink, Links } = SidePanelTemplate

const EmployeeNewSidePanel = (props) => {
  const { pages } = useStructure()
  const { contentRef } = useContext(ContentContext)

  const {
    personalDataRef,
    employeeDetailsRef,
    paymentDataRef,
    addressRef,
    contactRef,
    referenceContactRef,
  } = props

  const areas = useMemo(() => [
    { name: 'Dados pessoais', ref: personalDataRef },
    { name: 'Detalhes do funcionário', ref: employeeDetailsRef },
    { name: 'Dados para pagamento', ref: paymentDataRef },
    { name: 'Endereço', ref: addressRef },
    { name: 'Contato', ref: contactRef },
    { name: 'Contato para referência', ref: referenceContactRef },
  ], [personalDataRef, employeeDetailsRef, paymentDataRef, addressRef,
    contactRef, referenceContactRef])

  const onAreaClick = useCallback(({ ref }) => () => {
    if (!ref || !ref.current || !contentRef.current) {
      return null
    }

    const { current: content } = contentRef
    const { current: area } = ref
    content.scrollTo({
      top: area.offsetTop + 65,
      behavior: 'smooth',
    })

    setTimeout(() => {
      const input = area.querySelector('input, select')
      if (input) {
        input.focus()
      }
    })
    return true
  }, [contentRef])

  return (
    <SidePanelRender>
      <Layout>
        <Header>
          <BackLink route={ pages.EMPLOYEES.INDEX }>
            Voltar
          </BackLink>
          <Title>
            Novo Funcionário
          </Title>
        </Header>
        <Links>
          { areas.map((area) => {
            return (
              <a
                key={ area.name }
                className='pl-3 cursor-pointer'
                onClick={ onAreaClick(area) }
              >
                { area.name }
              </a>
            )
          })}
        </Links>
      </Layout>
    </SidePanelRender>
  )
}

EmployeeNewSidePanel.propTypes = {
  personalDataRef: PropTypes.object.isRequired,
  employeeDetailsRef: PropTypes.object.isRequired,
  paymentDataRef: PropTypes.object.isRequired,
  addressRef: PropTypes.object.isRequired,
  contactRef: PropTypes.object.isRequired,
  referenceContactRef: PropTypes.object.isRequired,
}

export default React.memo(EmployeeNewSidePanel)
