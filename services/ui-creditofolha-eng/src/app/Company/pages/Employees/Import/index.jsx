import React, { Fragment, useRef, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { ColumnWrapper, ColumnLeft, Title, Container, ColumnRight } from 'templates/PageTemplate'
import Button from 'components/Button'
import FileSearch from 'components/FileSearch'
import EmployeesSidePanel from 'company/pages/Employees/SidePanel'
import GridBuilder, { COLUMN_TYPE } from 'builders/GridBuilder'
import useImporter from 'hooks/useImporter'

const EmployeesGrid = GridBuilder()
  .addColumn('errors', 'Erros', '')
  .addColumn('nome', 'Nome', 'cliente.pessoa.nome')
  .addColumn('sobrenome', 'Sobrenome', 'cliente.pessoa.sobrenome')
  .addColumn('sexo', 'Sexo', 'cliente.sexo', COLUMN_TYPE.DROPDOWN, ['Masculino', 'Feminino'])
  .addColumn('nascimento', 'Data de Nascimento', 'cliente.nascimento', COLUMN_TYPE.DATE, [], 200)
  .addColumn('matricula', 'Matrícula', 'matricula')
  .addColumn('cpf', 'CPF', 'cliente.pessoa.cpf', COLUMN_TYPE.CPF)
  .addColumn('nome_mae', 'Nome da Mãe', 'cliente.nome_mae')
  .addColumn('admitido_em', 'Admissão', 'admitido_em', COLUMN_TYPE.DATE)
  .addColumn('salario_bruto', 'Salário Bruto Mensal', 'salario_bruto', COLUMN_TYPE.CURRENCY, [], 240)
  .addColumn('inss', 'INSS', 'inss', COLUMN_TYPE.CURRENCY)
  .addColumn('irrf', 'IRRF', 'irrf', COLUMN_TYPE.CURRENCY)
  .addColumn('descontos', 'Descontos Diversos', 'descontos', COLUMN_TYPE.CURRENCY)
  .addColumn('cargo', 'Cargo', 'cargo')
  .addColumn('comprometimento_outros', 'Empréstimo outros Bancos', 'comprometimento_outros', COLUMN_TYPE.CURRENCY)
  .addColumn('bloqueado', 'Bloqueado', 'bloqueado', COLUMN_TYPE.CHECKBOX)
  .initialRows(50)
  .build()

const EmployeesImport = ({ parent, entity: { pages: entityPages } }) => {
  const importer = useImporter()
  const gridRef = useRef()

  useEffect(() => {
  }, [])

  const onImportFile = useCallback(({ currentTarget: { files } }) => {
    importer.get(files[0]).then(() => {
    })
  }, [])

  const onExportTemplate = useCallback(() => {
    if (gridRef && gridRef.current) {
      gridRef.current.exportTemplate('Funcionarios Template.xlsx', 'Funcionarios')
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
          <Button className='btn btn-default mr-3'>
            Limpar
          </Button>
          <FileSearch
            className='mr-3'
            btnClassName='btn-secondary'
            onChange={ onImportFile }
            accept='.csv,.xlsx'
          >
            Importar
          </FileSearch>
          <Button onClick={ onExportTemplate }>
            Salvar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={ true } className=''>
        <div className='w-100 py-3'>
          <EmployeesGrid ref={ gridRef } />
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
