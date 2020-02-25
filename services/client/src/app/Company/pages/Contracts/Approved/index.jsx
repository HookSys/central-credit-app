import React, { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { contractsResetResults } from 'company/actions/contracts'

const ContractsApproved = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => () => {
    dispatch(contractsResetResults())
  }, [])

  return (
    <Fragment>
      { children }
    </Fragment>
  )
}

ContractsApproved.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(ContractsApproved)
