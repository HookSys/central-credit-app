import React, { Fragment } from 'react'
import { ColumnWrapper, ColumnLeft, Container } from 'templates/PageTemplate'
import Avatar from 'components/Avatar'

import EmployeeNewSidePanel from './SidePanel'

const EmployeesNew = () => {
  return (
    <Fragment>
      <EmployeeNewSidePanel />
      <ColumnWrapper>
        <ColumnLeft>
          <div className='d-flex align-items-center'>
            <Avatar
              title='Novo Funcionário'
              className='text-dark border-dark'
            />
            <div className='d-flex flex-column justify-content-center ml-2'>
              <span className='d-block font-size-xl mb-n1'>Novo Funcionário</span>
            </div>
          </div>
        </ColumnLeft>
      </ColumnWrapper>
      <Container isWhiteBackground={ true }>
        Form
      </Container>
    </Fragment>
  )
}

export default EmployeesNew
