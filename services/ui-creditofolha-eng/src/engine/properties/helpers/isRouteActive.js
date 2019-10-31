export default (location, route, entry) => {
  if (!route) {
    return location && location.pathname === entry
  }
  return location.pathname.indexOf(`${ entry }${ route }`) > -1 || false
}