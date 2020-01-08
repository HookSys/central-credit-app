import React from 'react'
import PropTypes from 'prop-types'
import { useWindowSize } from 'hooks'
import { useSelector } from 'react-redux'

import ContractsPendingListMobile from './Mobile'
import ContractsPendingListDesktop from './Desktop'

const ContractsPendingList = ({ onDetailsClick, onSelectedChange }) => {
  const size = useWindowSize()
  const contracts = useSelector(({ company }) => company.contracts.get('results'))
  const selected = useSelector(({ company }) => company.contracts.get('selected'))

  if (['XS', 'SM'].includes(size)) {
    return (
      <ContractsPendingListMobile
        contracts={ contracts }
        selected={ selected }
        onDetailsClick={ onDetailsClick }
        onSelectedChange={ onSelectedChange }
      />
    )
  }

  return (
    <ContractsPendingListDesktop
      contracts={ contracts }
      selected={ selected }
      onDetailsClick={ onDetailsClick }
      onSelectedChange={ onSelectedChange }
    />
  )
}

ContractsPendingList.propTypes = {
  onDetailsClick: PropTypes.func.isRequired,
  onSelectedChange: PropTypes.func.isRequired,
}

export default React.memo(ContractsPendingList)
