// @flow
import React, { useEffect, useState } from 'react'

import type { Node, Context } from 'react'
import type { History as THistory } from 'react-router-dom'
import type { TCreditoFolha, TServicesLoader, TReduxLoader, TThemesLoader,
  TEntityLoader, TPermissionsLoader, TLoader } from 'app/types'

import AppLoader from 'components/AppLoader'
import ThemesLoader from 'app/loaders/Themes'
import HistoryLoader from 'app/loaders/History'
import ReduxLoader from 'app/loaders/Redux'
import ServiceLoader from 'app/loaders/Services'
import PermissionsLoader from 'app/loaders/Permissions'
import EntityLoader from 'app/loaders/Entity'

const InitialCreditoFolha: TCreditoFolha = {
  Services: ({}: TServicesLoader),
  Permissions: { validate: () => undefined },
  History: {},
  Redux: ({}: TReduxLoader),
  Themes: {},
  Entity: ({}: TEntityLoader),
}

type TCreditoFolhaProps = {|
  children(p: TCreditoFolha): Node,
|}

const Loader = (): Promise<TCreditoFolha> => {
  const LoaderData: TCreditoFolha = {
    ...InitialCreditoFolha,
  }

  const Load = function<T> (loader: TLoader<T>): TLoader<T> {
    return new Proxy<TLoader<T>>(loader, {
      apply(target: TLoader<T>, thisArg, args): T {
        return target.bind(LoaderData, ...args)()
      },
    })
  }

  return new Promise<TCreditoFolha>(async (resolve) => {
    const history = Load<THistory>(HistoryLoader)()
    const redux = Load<TReduxLoader>(ReduxLoader)()
    const services = Load<TServicesLoader>(ServiceLoader)()
    const themes = Load<TThemesLoader>(ThemesLoader)()
    const permissions = Load<TPermissionsLoader>(PermissionsLoader)()
    const entity = Load<TEntityLoader>(EntityLoader)()

    LoaderData.History = await history.load()
    LoaderData.Services = await services.load()
    LoaderData.Redux = await redux.load()
    LoaderData.Themes = await themes.load()
    LoaderData.Permissions = await permissions.load()
    LoaderData.Entity = await entity.load()

    resolve(LoaderData)
  })
}

export const AppContext: Context<TCreditoFolha> = React.createContext<TCreditoFolha>(
  InitialCreditoFolha
)

const App = ({ children }: TCreditoFolhaProps) => {
  const [CreditoFolha, StartCreditoFolha] = useState<TCreditoFolha>(InitialCreditoFolha)

  useEffect(() => {
    Loader().then((data) => StartCreditoFolha(data))
  }, [])

  if (CreditoFolha && Object.keys(CreditoFolha.Themes).length > 0) {
    return (
      <AppContext.Provider value={ CreditoFolha }>
        { children(CreditoFolha) }
      </AppContext.Provider>
    )
  }

  return <AppLoader />
}

export default App
