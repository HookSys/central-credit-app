import refreshToken from './refreshToken'

export default (instance) => ({
  refreshToken: refreshToken.bind(instance),
})
