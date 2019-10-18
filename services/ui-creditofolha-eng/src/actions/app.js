export const APP_LOAD_SPINNER = 'APP_LOAD_SPINNER'
export const APP_UNLOAD_SPINNER = 'APP_UNLOAD_SPINNER'

export function appLoadSpinner() {
  return {
    type: APP_LOAD_SPINNER,
  }
}

export function appUnloadSpinner() {
  return {
    type: APP_UNLOAD_SPINNER,
  }
}
