// @flow
import React, { useEffect, useState } from 'react'

import type { Node, Context } from 'react'
import type { History } from 'react-router-dom'
import type { AppData, Services, Redux, Themes, Entity, Permissions, Loader as TLoader } from 'app/types'

import AppLoader from 'components/AppLoader'
import ThemesLoader from 'app/loaders/themes'
import HistoryLoader from 'app/loaders/history'
import ReduxLoader from 'app/loaders/redux'
import ServiceLoader from 'app/loaders/services'
import PermissionsLoader from 'app/loaders/permissions'
import EntityLoader from 'app/loaders/entity'

const InitialAppData: AppData = {
  Services: ({}: Services),
  Permissions: { validate: () => undefined },
  History: {},
  Redux: ({}: Redux),
  Themes: {},
  Entity: ({}: Entity),
}

type AppProps = {|
  children(p: AppData): Node,
|}

const Loader = (): Promise<AppData> => {
  const LoaderData: AppData = {
    ...InitialAppData,
  }

  const Load = function<T> (loader: TLoader<T>): TLoader<T> {
    return new Proxy<TLoader<T>>(loader, {
      apply(target: TLoader<T>, thisArg, args): T {
        return target.bind(LoaderData, ...args)()
      },
    })
  }

  return new Promise<AppData>(async (resolve) => {
    const history = Load<History>(HistoryLoader)()
    const redux = Load<Redux>(ReduxLoader)()
    const services = Load<Services>(ServiceLoader)()
    const themes = Load<Themes>(ThemesLoader)()
    const permissions = Load<Permissions>(PermissionsLoader)()
    const entity = Load<Entity>(EntityLoader)()

    LoaderData.History = await history.load()
    LoaderData.Services = await services.load()
    LoaderData.Redux = await redux.load()
    LoaderData.Themes = await themes.load()
    LoaderData.Permissions = await permissions.load()
    LoaderData.Entity = await entity.load()

    resolve(LoaderData)
  })
}

export const AppContext: Context<AppData> = React.createContext<AppData>(InitialAppData)

const App = ({ children }: AppProps) => {
  const [appData, setAppData] = useState<AppData>(InitialAppData)

  useEffect(() => {
    Loader().then((data) => setAppData(data))
  }, [])

  if (appData && Object.keys(appData.Themes).length > 0) {
    return (
      <AppContext.Provider value={ appData }>
        { children(appData) }
      </AppContext.Provider>
    )
  }

  return <AppLoader />
}

export default App
