import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeRender from 'components/ThemeRender'
import AppLoader from 'components/AppLoader'
import ToastProvider from 'components/ToastProvider'
import App from 'app'

import 'moment/locale/pt-br'

const Pages = lazy(() => import('pages'))

ReactDOM.render(
  <App>
    { ({ Redux, History, Entity }) => (
      <Provider store={ Redux.store }>
        <PersistGate loading={ null } persistor={ Redux.persistor }>
          <Suspense fallback={ <AppLoader /> }>
            <ToastProvider>
              <ThemeRender />
              <Pages history={ History } entity={ Entity } />
            </ToastProvider>
          </Suspense>
        </PersistGate>
      </Provider>
    ) }
  </App>,
  document.getElementById('root')
)
