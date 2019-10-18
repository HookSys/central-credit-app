import { Record, List, Map } from 'immutable'

const defaultValues = {
  count: 0,
  next: null,
  previous: null,
  results: new List(),
  selected: new List(),
  options: new Map(),
  filters: new Map(),
  errorMessage: '',
}

export default class BaseList extends Record(defaultValues, BaseList) {
  constructor(values) {
    super({
      ...values,
      filters: values && values.filters ? values.filters : defaultValues.filters,
      options: values && values.options ? values.options : defaultValues.options,
    })
  }

  static sortAscending(item1, item2, isMoment) {
    if (isMoment) {
      return item1.isAfter(item2) ? -1 : 1
    }
    return String(item1).trim().localeCompare(String(item2).trim())
  }

  static sortDescending(item1, item2, isMoment) {
    if (isMoment) {
      return item2.isAfter(item1) ? -1 : 1
    }
    return String(item2).trim().localeCompare(String(item1).trim())
  }

  static filterByKey(items, key, value) {
    return items.filter((item) => {
      return `${ item.get(`${ key }`) }` === `${ value }`
    })
  }

  static sortByKey(items, key, sortDirection) {
    const sortFunction = sortDirection === 'Asc' ? this.sortAscending : this.sortDescending
    return items.sort((item1, item2) => {
      return sortFunction(`${ item1.get(`${ key }`) }`, `${ item2.get(`${ key }`) }`)
    })
  }

  static findIndexByKey(items, key, value) {
    return items.findIndex((item) => {
      return `${ item.get(`${ key }`) }` === `${ value }`
    })
  }

  static getListSorted(items, sortBy, isAsc = true, isMoment = false) {
    if (items && List.isList(items)) {
      const sortFunction = isAsc ? this.sortAscending : this.sortDescending
      return items.sort((item1, item2) => {
        const valueItem1 = Array.isArray(sortBy) ? item1.getIn(sortBy) : item1.get(sortBy)
        const valueItem2 = Array.isArray(sortBy) ? item2.getIn(sortBy) : item2.get(sortBy)
        return sortFunction(valueItem1, valueItem2, isMoment)
      })
    }
    return items
  }
}

export const toEntityList = (data, Entity) => {
  let entityItems = new List()
  if (data) {
    data.forEach((value) => {
      entityItems = entityItems.push(new Entity(value))
    })
  }
  return entityItems
}
