import { model, property, Entity } from '@loopback/repository';
import { Sacado } from './sacado.model';
import { Cedente } from './cedente.model';

@model()
export class Titulo extends Entity {
  @property({
    id: true,
    generated: false
  })
  S_ID: number;

  @property()
  O_SACADO_CNPJ: Sacado;

  @property()
  S_NUMERO_TITULO: string;

  @property()
  D_DATA_EMISSAO: Date;

  @property()
  S_VALOR_TITULO: string;

  @property()
  D_DATA_VENCIMENTO: Date;

  @property()
  D_DATA_PAGAMENTO: Date;

  @property()
  O_CEDENTE_CNPJ: Cedente;

  @property()
  D_ULTIMO_ENVIO: Date;

  constructor(data?: Partial<Titulo>) {
    super(data);
  }
}

export interface TituloRelations {
  // describe navigational properties here
}

export type TituloWithRelations = Titulo & TituloRelations;
