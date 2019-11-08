import BaseRecord from 'models/utils/BaseRecord'

const defaultValues = {
  tipo: null,
  numero: null,
  emissao_em: null,
  emissor: null,
  uf: null,
}

export default class Document extends BaseRecord(defaultValues, Document) {
  constructor(values) {
    super({
      ...values,
    })
  }
}
