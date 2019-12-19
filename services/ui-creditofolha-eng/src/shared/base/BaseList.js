// @flow
import { Record, List, Map, RecordInstance } from 'immutable'
import type { BaseRecordOf, BaseRecordFactory } from './BaseRecord'

type TBaseListValues<O> = {|
  count: number,
  next: string | null,
  previous: string | null,
  results: List<BaseRecordOf<O>>,
  selected: List<BaseRecordOf<O>>,
  options: Map<string, any>,
  filters: Map<string, any>
|}

export default function BaseList<O: Object>(
  defaultValues: TBaseListValues<O>
): RecordInstance<TBaseListValues<O>> {
  class CBaseList extends Record<TBaseListValues<O>>(defaultValues, 'CBaseList') {
    constructor(values) {
      super({
        ...values,
        filters: values && values.filters ? values.filters : defaultValues.filters,
        options: values && values.options ? values.options : defaultValues.options,
      })
    }

    getTotalPages(): number {
      const options = this.get('options')
      if (options && options.get('limit')) {
        return Math.ceil(this.get('count') / options.get('limit'))
      }
      return 0
    }

    withoutItem(value: any, field: string = 'id'): this {
      const results = this.get('results')
      return this.set('results', results.filter((item) => {
        return item.get(field) !== value
      }))
    }
  }

  return new CBaseList(defaultValues)
}

export function toEntityList<O: Object = Object>(
  data: Array<O>,
  Entity: BaseRecordFactory<O>
): List<BaseRecordOf<O>> {
  let entityItems = new List<BaseRecordOf<O>>()
  if (data) {
    data.forEach((value) => {
      entityItems = entityItems.push(new Entity(value))
    })
  }
  return entityItems
}
