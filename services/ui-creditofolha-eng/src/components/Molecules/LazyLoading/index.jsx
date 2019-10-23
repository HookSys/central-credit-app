import React from 'react'
import Loadable from '@loadable/component'
import { Spinner } from 'components'

const LazyLoading = (loader) => {
  return Loadable(loader, {
    fallback: <Spinner />,
  })
}

export default LazyLoading
