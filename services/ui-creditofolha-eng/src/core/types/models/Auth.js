// @flow
export type TAuthValues = {
  authenticated: boolean,
  access: string,
  refresh: string,
  refreshTokenPromise: ?Promise<any>,
  errors: any,
  userFunction: number,
}

export type TAuthLoginRequest = {
  email: string,
  senha: string,
}

export type TAuthLoginResponse = {|
  access: string,
  refresh: string,
|}
