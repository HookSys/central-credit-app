import { Entity, model, property } from '@loopback/repository'

@model()
class DomainOption {
  @property({ required: true })
  value: string

  @property({ required: true })
  label: string
}

@model()
export class Domain extends Entity {
  @property({
    type: 'string',
    id: true
  })
  id: string

  @property({
    type: 'string',
    required: true
  })
  description: string

  @property.array(DomainOption)
  options: DomainOption[]

  constructor(data?: Partial<Domain>) {
    super(data)
  }
}

export interface DomainRelations {}

export type DomainWithRelations = Domain & DomainRelations
