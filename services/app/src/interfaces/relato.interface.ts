//#region Types
export type CedenteType = {
  _id: string;
  S_ID: number;
  S_CNPJ: string;
  S_RAZAO_SOCIAL: string;
  S_DESATIVADO: boolean;
};

export type SacadoType = {
  _id: string;
  S_ID: number;
  S_CNPJ: string;
  S_RAZAO_SOCIAL: string;
  D_CLIENTE_DESDE: Date;
  S_TIPO_CLIENTE: string;
  S_RELACIONADO: boolean;
  O_CEDENTE_ORIGIN: string;
};

export type TituloType = {
  _id: string;
  S_ID: number;
  O_SACADO_CNPJ: SacadoType;
  S_NUMERO_TITULO: string;
  D_DATA_EMISSAO: Date;
  S_VALOR_TITULO: string;
  D_DATA_VENCIMENTO: Date;
  D_DATA_PAGAMENTO: Date;
  O_CEDENTE_CNPJ: string;
  D_ULTIMO_ENVIO: Date;
};

export type ConfigType = {
  _id: string;
  S_EMPRESA_CNPJ: string;
};
//#endregion

//#region Requests
export type GenerateRequest = {
  database: string;
  onlyPayments: string;
  code: string;
};

export type GenerateAllRequest = {
  database: string;
  onlyPayments: string;
};

export type FindRequest = {
  type: string;
};

export type SaveRequest = {
  titles: string;
};
//#endregion

//#region Responses
export interface QuerySacados {
  sacados: Array<SacadoType>;
}

export interface QueryCedentes {
  cedentes: Array<CedenteType>;
}

export interface QueryTitulos {
  titulos: Array<TituloType>;
}

export interface QueryConfigs {
  configs: Array<ConfigType>;
}

export interface UploadTitles {
  success: boolean;
}
//#endregion
