import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider as EngineProvider } from 'engine'
import { ThemeRender, AppLoader, ToastProvider } from 'components'

import 'moment/locale/pt-br'

const Pages = lazy(() => import('pages'))

ReactDOM.render(
  <EngineProvider>
    { (Engine) => {
      const { store, persistor } = Engine.store.configure()
      return (
        <Provider store={ store }>
          <PersistGate loading={ null } persistor={ persistor }>
            <Suspense fallback={ <AppLoader /> }>
              <ToastProvider>
                <ThemeRender />
                <Pages />
              </ToastProvider>
            </Suspense>
          </PersistGate>
        </Provider>
      )
    } }
  </EngineProvider>,
  document.getElementById('root')
)
