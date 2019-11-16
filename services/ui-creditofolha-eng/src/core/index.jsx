// @flow
import React, { useEffect, useState } from 'react'

import type { Node, Context } from 'react'
import type { History as THistory } from 'react-router-dom'
import type { TCore, TServicesLoader, TReduxLoader, TThemesLoader,
  TEntityLoader, TPermissionsLoader, TLoader } from 'types'

import AppLoader from 'components/AppLoader'
import ThemesLoader from 'loaders/Themes'
import HistoryLoader from 'loaders/History'
import ReduxLoader from 'loaders/Redux'
import ServiceLoader from 'loaders/Services'
import PermissionsLoader from 'loaders/Permissions'
import EntityLoader from 'loaders/Entity'

const InitialCore: TCore = {
  Services: ({}: TServicesLoader),
  Permissions: { validate: () => undefined },
  History: {},
  Redux: ({}: TReduxLoader),
  Themes: {},
  Entity: ({}: TEntityLoader),
}

type TCoreProps = {|
  children(p: TCore): Node,
|}

const Loader = (): Promise<TCore> => {
  const LoaderData: TCore = {
    ...InitialCore,
  }

  const Load = function<T> (loader: TLoader<T>): TLoader<T> {
    return new Proxy<TLoader<T>>(loader, {
      apply(target: TLoader<T>, thisArg, args): T {
        return target.bind(LoaderData, ...args)()
      },
    })
  }

  return new Promise<TCore>(async (resolve) => {
    const history = Load<THistory>(HistoryLoader)()
    const redux = Load<TReduxLoader>(ReduxLoader)()
    const services = Load<TServicesLoader>(ServiceLoader)()
    const themes = Load<TThemesLoader>(ThemesLoader)()
    const permissions = Load<TPermissionsLoader>(PermissionsLoader)()
    const entity = Load<TEntityLoader>(EntityLoader)()

    LoaderData.History = await history.load()
    console.log('LOADED History', LoaderData.History)

    LoaderData.Services = await services.load()
    console.log('LOADED Services', LoaderData.Services)

    LoaderData.Redux = await redux.load()
    console.log('LOADED Redux', LoaderData.Redux)

    LoaderData.Themes = await themes.load()
    console.log('LOADED Themes', LoaderData.Themes)

    LoaderData.Permissions = await permissions.load()
    console.log('LOADED Permissions', LoaderData.Permissions)

    LoaderData.Entity = await entity.load()
    console.log('LOADED Entity', LoaderData.Entity)

    resolve(LoaderData)
  })
}

export const CoreContext: Context<TCore> = React.createContext<TCore>(
  InitialCore
)

const Core = ({ children }: TCoreProps) => {
  const [core, startCore] = useState<TCore>(InitialCore)

  useEffect(() => {
    console.log('LOADING')
    Loader().then((data) => {
      console.log('LOADED', data)
      startCore(data)
    })
  }, [])

  if (core && Object.keys(core.Themes).length > 0) {
    return (
      <CoreContext.Provider value={ core }>
        { children(core) }
      </CoreContext.Provider>
    )
  }

  return <AppLoader />
}

export default Core
