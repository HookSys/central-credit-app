import BaseRecord from 'base/BaseRecord'
import Payment from 'models/Payment'
import Document from 'models/Document'
import Address from 'models/Address'
import Spouse from 'models/Spouse'
import { get } from 'lodash'

const defaultValues = {
  cpf: 0,
  email: '',
  sobrenome: '',
  nome: '',
  nascimento: '',
  nascimento_uf: '',
  sexo: '',
  documento: new Document(),
  endereco: new Address(),
  nacionalidade: '',
  estado_civil: '',
  nome_pai: '',
  nome_mae: '',
  conjugue: new Spouse(),
  telefone_celular: '',
  telefone_fixo: '',
  pagamento: new Payment(),
  cargo: '',
  salario_bruto: 0,
  salario_liquido: 0,
  escolaridade: '',
}

export default class ContractClientInfo extends BaseRecord(defaultValues, ContractClientInfo) {
  constructor(values) {
    super({
      ...values,
      documento: get(values, 'documento', false) ? new Document(values.documento) : defaultValues.documento,
      endereco: get(values, 'endereco', false) ? new Address(values.endereco) : defaultValues.endereco,
      conjugue: get(values, 'conjugue', false) ? new Spouse(values.conjugue) : defaultValues.conjugue,
      pagamento: get(values, 'pagamento', false) ? new Payment(values.pagamento) : defaultValues.pagamento,
    })
  }
}
