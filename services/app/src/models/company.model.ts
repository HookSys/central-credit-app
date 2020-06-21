import { Entity, model, property } from '@loopback/repository';

@model()
export class Company extends Entity {
  @property({
    id: true
  })
  id?: string;

  @property({
    type: 'string'
  })
  name: string;

  @property({
    type: 'string'
  })
  cnpj?: string;

  @property({
    type: 'string',
    required: true
  })
  code: 'gold' | 'central' | 'consult';

  @property({
    type: 'number'
  })
  totalSacados: number;

  @property({
    type: 'number'
  })
  totalCedentes: number;

  @property({
    type: 'number'
  })
  totalTitulos: number;

  @property({
    type: 'Date'
  })
  lastSync: Date;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
