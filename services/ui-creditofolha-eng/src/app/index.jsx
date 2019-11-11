// @flow

import React, { useEffect, useState } from 'react'
import type { Node, Context } from 'react'
import AppLoader from 'components/AppLoader'


type AppData = {|
  Service: Object,
  Themas: Object,
  Structures: Object,
|}

const InitialAppData: AppData = {
  Service: {},
  Themas: {},
  Structures: {},
}

type AppProps = {|
  children: Node,
|}

const Loader = (): Promise<AppData> => new Promise<AppData>(async (resolve) => {
  resolve(InitialAppData)
})

const AppContext: Context<AppData> = React.createContext<AppData>(InitialAppData)

const App = ({ children }: AppProps) => {
  const [appData, setAppData] = useState(false)

  useEffect(() => {
    Loader().then((isOk) => setAppData(isOk))
  }, [])

  if (appData) {
    return (
      <AppContext.Provider value={ appData }>
        { children }
      </AppContext.Provider>
    )
  }

  return <AppLoader />
}

export default App
