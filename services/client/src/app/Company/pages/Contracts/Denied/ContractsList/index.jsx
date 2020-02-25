import React from 'react'
import { useWindowSize } from 'hooks'
import { useSelector } from 'react-redux'

import ContractsDeniedListMobile from './Mobile'
import ContractsDeniedListDesktop from './Desktop'

const ContractsDeniedList = () => {
  const size = useWindowSize()
  const contracts = useSelector(({ company }) => company.contracts.get('results'))

  if (['XS', 'SM'].includes(size)) {
    return (
      <ContractsDeniedListMobile
        contracts={ contracts }
      />
    )
  }

  return (
    <ContractsDeniedListDesktop
      contracts={ contracts }
    />
  )
}

export default React.memo(ContractsDeniedList)
