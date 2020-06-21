// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { model, property } from '@loopback/repository';
// import { ModelCrudRestApiConfig } from '@loopback/rest-crud';
@model()
export class Cedente {
  @property({ id: true })
  S_ID: number;

  @property()
  S_CNPJ: string;

  @property()
  S_RAZAO_SOCIAL: string;

  @property()
  S_DESATIVADO: boolean;
}

@model()
export class Sacado {
  @property({ id: true })
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
}

@model()
export class Titulo {
  @property({ id: true })
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
}

@model()
export class Envio {
  @property()
  D_PERIODO_INICIO: Date;

  @property()
  D_PERIODO_FIM: Date;

  @property()
  D_ENVIO: Date;

  @property()
  A_TITULOS: Array<Titulo>;

  @property()
  N_QNTD_TITULOS: Number;

  @property()
  N_QNTD_RELACION: Number;
}
