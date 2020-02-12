import { Entity, model, property, ValueObject } from '@loopback/repository'

export enum RecordFieldType {
  NUMBER = 'number',
  STRING = 'string'
}

export enum RecordParameterType {
  NUMBER = 'number',
  STRING = 'string',
  DATE = 'date',
  COMBOBOX = 'combobox',
  CHECKBOX = 'checkbox',
  RADIOBUTTON = 'radiobutton'
}

export class RecordField extends ValueObject {
  seq: number
  size: number
  type: RecordFieldType = RecordFieldType.STRING
  value?: string
  description?: string
  isRequired?: boolean = false
}

export class RecordParameter extends ValueObject {
  id: string
  type: RecordParameterType = RecordParameterType.STRING
  defaultValue?: string
  domain?: string
}

@model()
export class Record extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id: string

  @property({
    type: 'string',
    required: true
  })
  name: string

  @property({
    type: 'number',
    required: true,
    default: 115
  })
  size: number

  @property({
    type: 'date',
    required: true
  })
  createdAt: string

  @property.array(RecordField, { required: true })
  fields: RecordField[]

  @property.array(RecordParameter, { required: true })
  params: RecordParameter[]

  constructor(data?: Partial<Record>) {
    super(data)
  }

  getFields(): RecordField[] {
    return this.fields.sort((field1, field2) => field1.seq - field2.seq)
  }
}

export interface RecordRelations {}

export type RecordWithRelations = Record & RecordRelations
