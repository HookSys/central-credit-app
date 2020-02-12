import { Entity, model, property, ValueObject } from '@loopback/repository'
import { RecordFieldType } from './record.model'

export class LayoutField extends ValueObject {
  seq: number
  size: number
  value?: string
  type?: RecordFieldType
  description?: string
}

export type LayoutFields = 'protocol' | 'options' | 'data'

@model()
export class Layout extends Entity {
  @property({ id: true })
  id: string

  @property({ required: true })
  name: string

  @property.array(LayoutField, { required: true })
  protocol: LayoutField[]

  @property.array(LayoutField, { required: true })
  options: LayoutField[]

  @property.array(LayoutField)
  data: LayoutField[]

  constructor(data?: Partial<Layout>) {
    super(data)
  }

  getOrdered(field: LayoutFields): LayoutField[] {
    return this[field].sort((field1, field2) => field1.seq - field2.seq)
  }
}

export interface LayoutRelations {}

export type LayoutWithRelations = Layout & LayoutRelations
