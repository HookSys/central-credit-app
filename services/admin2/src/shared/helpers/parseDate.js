import moment from 'moment'

export default (value, format = 'DD/MM/YYYY', fromFormat) => {
  if (!value) {
    return null
  }

  if (!fromFormat) {
    return moment(value).format(format)
  }

  return moment(value, fromFormat).format(format)
}
