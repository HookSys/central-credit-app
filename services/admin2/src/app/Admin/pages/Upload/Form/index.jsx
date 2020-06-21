import React, { Fragment, useCallback, useEffect, useState, useRef, useContext } from 'react'
// import PropTypes from 'sprop-types'
import { Title, ColumnWrapper, ColumnLeft, ColumnRight, Container } from 'templates/PageTemplate'
import { Row, Element } from 'components/FormContent'
import { useImporter } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { companiesAsyncRequest } from 'admin/actions/companies'

import { ToastContext } from 'components/ToastProvider'
import Button from 'components/Button'
import FileSearch from 'components/FileSearch'

const UploadForm = () => {
  const { showSuccessToast } = useContext(ToastContext)
  const dispatch = useDispatch()
  const companies = useSelector(({ admin }) => admin.companies.get('results'))
  const [fileName, setFileName] = useState()
  const [isInvalid, setIsInvalid] = useState(false)
  const [fileText, setFileText] = useState()
  const divRef = useRef()
  const history = useHistory()
  const importer = useImporter()

  const onCancel = useCallback(() => {
    history.goBack()
  }, [])

  useEffect(() => {
    if (!companies || companies.size === 0) {
      dispatch(companiesAsyncRequest(true))
    }
  }, [])

  const validateTitlesFile = useCallback((value) => {
    const lines = value.split('\r\n')
    return lines.reduce((v, line, i) => {
      if (line.length !== 129) {
        return { i, line }
      }
      return true
    }, true)
  }, [])

  const onLoadFile = useCallback(({ currentTarget: { files } }) => {
    importer.text(files[0]).then(({ value, name }) => {
      if (value) {
        setFileName(name)
        const invalid = validateTitlesFile(value)
        if (typeof invalid === 'object') {
          setIsInvalid(true)
        } else {
          setIsInvalid(false)
          setFileText(value)
        }
        divRef.current.innerText = value
      }
    })
  }, [importer, setFileName, validateTitlesFile, setFileText])


  const onSubmit = useCallback(async () => {
    showSuccessToast({
      message: 'Arquivo carregado com sucesso!'
    })
  }, [fileText])

  return (
    <Fragment>
      <ColumnWrapper>
        <ColumnLeft>
          <Title>Envio de Arquivos</Title>
        </ColumnLeft>
        <ColumnRight isActionBar={true}>
          <Button className='btn btn-default mr-3' onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={onSubmit} disabled={!fileName || isInvalid}>
            Enviar
          </Button>
        </ColumnRight>
      </ColumnWrapper>
      <Container isWhiteBackground={true}>
        <Row>
          <Element lg='12'>
            <div className='d-flex align-items-center'>
              <FileSearch accept='.txt' onChange={onLoadFile}>
                Carregar
              </FileSearch>
              { fileName && (<span className='d-block ml-3 font-weight-bold'>{ fileName }</span>) }
            </div>
          </Element>
        </Row>
      </Container>
      {fileName && (
        <Container isWhiteBackground={true} className='mt-3 p-4'>
          <Row>
            <Element lg='12'>
              { isInvalid
                ? (<span className='text-danger'>O arquivo está com problemas e não poderá ser enviado</span>)
                : (<span className='text-success'>O arquivo está pronto para ser enviado!</span>)
              }
            </Element>
          </Row>
          <Row>
            <Element lg='12'>
              <code ref={divRef} className='mt-3 d-block text-monospace monospace' />
            </Element>
          </Row>
        </Container>
      )}
    </Fragment>
  )
}

UploadForm.propTypes = {
}

export default UploadForm
