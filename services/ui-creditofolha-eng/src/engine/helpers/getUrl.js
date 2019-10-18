export default (locationHref) => {
  const urlParts = locationHref.split('/')
  return `${ urlParts[0] }//${ urlParts[2] }`
}
