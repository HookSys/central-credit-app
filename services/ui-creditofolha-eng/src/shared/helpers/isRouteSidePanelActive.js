export default (location, route, key, routeObj) => {
  if (key === 'INDEX' && !routeObj.isNotIndex) {
    return location && location.pathname === route
  }

  return location.pathname.indexOf(route) > -1 || false
}
