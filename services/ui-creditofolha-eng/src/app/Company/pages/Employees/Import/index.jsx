import React, { Fragment, useRef, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { ColumnWrapper, ColumnLeft, Title, Container, ColumnRight } from 'templates/PageTemplate'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'
import FileSearch from 'components/FileSearch'
import EmployeesSidePanel from 'company/pages/Employees/SidePanel'
import GridBuilder, { COLUMN_TYPE } from 'builders/GridBuilder'
import { genre } from 'constants/general'
import { employeeCreateBulkRequest } from 'company/actions/employees'

const EmployeesGrid = GridBuilder()
  .addColumn('nome', 'Nome', 'nome')
  .addColumn('sobrenome', 'Sobrenome', 'sobrenome')
  .addColumn('sexo', 'Sexo', 'sexo', COLUMN_TYPE.DROPDOWN, genre)
  .addColumn('nascimento', 'Data de Nascimento', 'nascimento', COLUMN_TYPE.DATE, [], 200)
  .addColumn('matricula', 'Matrícula', 'matricula')
  .addColumn('cpf', 'CPF', 'cpf', COLUMN_TYPE.CPF, [], 200)
  .addColumn('nome_mae', 'Nome da Mãe', 'nome_mae')
  .addColumn('admitido_em', 'Admissão', 'admitido_em', COLUMN_TYPE.DATE)
  .addColumn('salario', 'Salário Bruto Mensal', 'salario', COLUMN_TYPE.CURRENCY, [], 220)
  .addColumn('inss', 'INSS', 'inss', COLUMN_TYPE.CURRENCY)
  .addColumn('irrf', 'IRRF', 'irrf', COLUMN_TYPE.CURRENCY)
  .addColumn('descontos', 'Descontos Diversos', 'descontos', COLUMN_TYPE.CURRENCY, [], 220)
  .addColumn('cargo', 'Cargo', 'cargo')
  .addColumn('comprometimento_outros', 'Empréstimo outros Bancos', 'comprometimento_outros', COLUMN_TYPE.CURRENCY)
  .addColumn('bloqueado', 'Bloqueado', 'bloqueado', COLUMN_TYPE.CHECKBOX)
  .primaryKey('matricula')
  .parentKey('funcionarios')
  .initialRows(50)
  .build()

const EmployeesImport = ({ parent, entity: { pages: entityPages } }) => {
  const gridRef = useRef()
  const dispatch = useDispatch()
  const [wasChanged, toggleWasChanged] = useState()

  const onImportFile = useCallback(({ currentTarget: { files } }) => {
    if (gridRef && gridRef.current) {
      gridRef.current.import(files[0], 'Funcionários')
    }
  }, [])

  const onExportTemplate = useCallback(() => {
    if (gridRef && gridRef.current) {
      gridRef.current.exportTemplate('Funcionários_Template.xlsx', 'Funcionários')
    }
  }, [])

  const onSave = useCallback(() => {
    if (gridRef && gridRef.current) {
      const employees = gridRef.current.getData()
      dispatch(employeeCreateBulkRequest(employees.filter((employee) => !employee.bloqueado)))
    }
  }, [])

  const onGridChange = useCallback(() => {
    if (!wasChanged) {
      toggleWasChanged(true)
    }
  }, [wasChanged])

  const onCleanClick = useCallback(() => {
    if (gridRef && gridRef.current) {
      gridRef.current.clean()
      toggleWasChanged(false)
    }
  }, [])

  return (
    <Fragment>
      <EmployeesSidePanel
        pages={ entityPages.EMPLOYEES }
        routes={ parent.routes }
      />
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Importação de funcionários</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={ true }>
          <Button onClick={ onExportTemplate } className='btn btn-link mr-3'>
            Exportar Modelo
          </Button>
          { wasChanged ? (
            <Button className='btn btn-default mr-3' onClick={ onCleanClick }>
              Limpar
            </Button>
          ) : (
            <FileSearch
              className='mr-3'
              btnClassName='btn-secondary'
              onChange={ onImportFile }
              accept='.csv,.xlsx'
            >
              Importar
            </FileSearch>
          )}
          <Button onClick={ onSave }>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true } className=''>
        <div className='w-100 py-3'>
          <EmployeesGrid ref={ gridRef } onRowsChange={ onGridChange } />
        </div>
      </Container>
    </Fragment>
  )
}

EmployeesImport.propTypes = {
  entity: PropTypes.object.isRequired,
  parent: PropTypes.object.isRequired,
}

export default React.memo(EmployeesImport)
