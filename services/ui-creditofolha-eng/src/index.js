import React from 'react'
import ReactDOM from 'react-dom'
import AppEngine from 'engine'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Pages from 'pages'

import 'moment/locale/pt-br'

const { store, persistor } = AppEngine.store.configure()

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
      <Pages />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
