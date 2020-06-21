import { Entity, model, property } from '@loopback/repository';

@model()
export class Cedente extends Entity {
  @property({
    id: true,
    generated: false
  })
  S_ID: number;

  @property()
  S_CNPJ: string;

  @property()
  S_RAZAO_SOCIAL: string;

  @property()
  S_DESATIVADO: boolean;

  constructor(data?: Partial<Cedente>) {
    super(data);
  }
}

export interface CedenteRelations {
  // describe navigational properties here
}

export type CedenteWithRelations = Cedente & CedenteRelations;
