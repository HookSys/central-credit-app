// @flow
import { createBrowserHistory } from 'history'

import type { History as THistory } from 'react-router-dom'
import type { TLoader } from 'app/types'

function History(): TLoader<THistory> {
  const createdHistory: THistory = createBrowserHistory()

  return {
    load: async () => {
      return createdHistory
    },
  }
}

export default History
