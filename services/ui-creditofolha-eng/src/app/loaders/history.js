// @flow
import { createBrowserHistory } from 'history'

import type { History } from 'react-router-dom'
import type { Loader } from 'app/types'

function history(): Loader<History> {
  const createdHistory: History = createBrowserHistory()

  return {
    load: async () => {
      return createdHistory
    },
  }
}

export default history
