/* eslint-disable no-return-await */
export default async function (propertyObj) {
  if (!propertyObj || !propertyObj.default) {
    throw new Error('No property found')
  }
  const { default: property } = propertyObj
  const tst = typeof property === 'function' ? await property.apply(this) : property
  return tst
}
