import { Entity, model, property } from '@loopback/repository'

@model()
export class Field extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string

  @property({
    type: 'number',
    required: true
  })
  seq: number

  @property({
    type: 'number',
    required: true
  })
  size: number

  @property({
    type: 'string'
  })
  value?: string

  @property({
    type: 'string',
    default: 'NUMBER'
  })
  type?: string

  @property({
    type: 'string'
  })
  description?: string

  constructor(data?: Partial<Field>) {
    super(data)
  }
}

export interface FieldRelations {}

export type FieldWithRelations = Field & FieldRelations
