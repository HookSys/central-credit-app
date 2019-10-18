import { Record, List, Map } from 'immutable'
import BaseList from 'models/utils/BaseList'
import moment from 'moment'

const BaseRecord = (defaultValues, component) => class extends Record(defaultValues, component) {
  static getQuery() {
    return Object.keys(defaultValues)
  }

  getGenre() {
    return this.get('sexo') === 'F' ? 'Feminino' : 'Masculino'
  }

  getListSorted(field, sortBy, isAsc = true, isMoment = false) {
    const list = typeof field === 'string' ? this.get(field) : field
    if (list && List.isList(list)) {
      const sortFunction = isAsc ? BaseList.sortAscending : BaseList.sortDescending
      return list.sort((item1, item2) => {
        const valueItem1 = Array.isArray(sortBy) ? item1.getIn(sortBy) : item1.get(sortBy)
        const valueItem2 = Array.isArray(sortBy) ? item2.getIn(sortBy) : item2.get(sortBy)
        return sortFunction(valueItem1, valueItem2, isMoment)
      })
    }
    return list
  }

  getAsMapList(field) {
    const list = this.get(field)
    if (List.isList(list)) {
      return list.map((item) => new Map(item))
    }

    return list
  }

  getFormatedDate(field, format = 'DD/MM/YYYY') {
    if (this.get(field)) {
      return moment(this.get(field), 'YYYY-MM-DD').format(format)
    }
    return '-'
  }

  getDifferenceBtwCurrency(field1, field2, formated = false) {
    const field1Value = typeof field1 === 'number' ? field1 : this.get(field1)
    const field2Value = typeof field2 === 'number' ? field2 : this.get(field2)
    if (typeof field1Value === 'number' && typeof field2Value === 'number') {
      const value = field1Value - field2Value
      return formated ? this.getFormatedCurrency(value, true) : value
    }

    return formated ? this.getFormatedCurrency(0, true) : 0
  }

  getFormatedCurrency(field, isValue = false) {
    const value = isValue ? field : (this.get(field) || 0)
    const monetaryValue = typeof value === 'number' ? value : Number.parseFloat(value)
    return monetaryValue.toLocaleString('pt-BR', {
      currency: 'BRL',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: 'currency',
    })
  }

  getFormatedPercent(field, abs = true, isValue = false) {
    const value = isValue ? field : this.get(field)
    const fractionaryValue = typeof value === 'number' ? value : Number.parseFloat(value)
    return (abs ? fractionaryValue : (fractionaryValue / 100)).toLocaleString('pt-BR', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
      style: 'percent',
    })
  }

  getFormatedText(field) {
    const value = this.get(field)
    return value ? (value.charAt(0).toUpperCase() + value.slice(1)).replace('-', ' ') : value
  }

  setAsMoment(field, date) {
    return this.set(field, moment(date))
  }

  replaceSemicolon(field) {
    const value = this.get(field)
    let newValue = null

    if (!value) {
      return ''
    }

    newValue = value.toString()
    return newValue ? newValue.replace('.', ',') : ''
  }

  getFormatedPhoneNumber(field) {
    let number = this.get(field)

    if (/^\+55/.test(number)) {
      number = number.slice(3)
    }

    if (!number) {
      return null
    }

    return number.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '($1) $2 $3 $4')
  }
}

export default BaseRecord
