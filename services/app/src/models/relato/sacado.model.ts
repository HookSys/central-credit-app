import { Entity, model, property } from '@loopback/repository';
import { Cedente } from './cedente.model';

@model()
export class Sacado extends Entity {
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
  D_CLIENTE_DESDE: Date;

  @property()
  S_TIPO_CLIENTE: string;

  @property()
  S_RELACIONADO: boolean;

  @property()
  O_CEDENTE_ORIGIN: Cedente;

  constructor(data?: Partial<Sacado>) {
    super(data);
  }
}

export interface SacadoRelations {
  // describe navigational properties here
}

export type SacadoWithRelations = Sacado & SacadoRelations;
