import { get } from 'lodash'
import BaseRecord from 'base/BaseRecord'
import Payment from 'models/Payment'
import Client from 'models/Client'

const defaultValues = {
  id: '',
  cliente: new Client(),
  empresa: null,
  status: '',
  matricula: '',
  admitido_em: '',
  cargo: '',
  salario_bruto: null,
  outros_vencimentos: null,
  salario_liquido: null,
  comprometimento_outros: null,
  pagamento: new Payment(),
  descontos: null,
  inss: null,
  irrf: null,
  bloqueado: null,
  contratos_count: null,
  contratos_demissao_info: null,
  comprometimento_cep: null,
  valor_comprometido: null,
  percentual_comprometido: null,
  convenios_info: null,
  pis_pasep: null,
}

export default class Employment extends BaseRecord(defaultValues, Employment) {
  constructor(values) {
    super({
      ...values,
      pagamento: get(values, 'pagamento') ? new Payment(values.pagamento) : defaultValues.pagamento,
      cliente: get(values, 'cliente') ? new Client(values.cliente) : defaultValues.cliente,
    })
  }
}
