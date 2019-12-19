import { Map } from 'immutable'
import Employee from 'models/Employee'

export default class EmployeeFactory {
  static createRequest(values) {
    if (!values) {
      return new Map()
    }

    const employee = new Employee(values.toJS())
    return new Map({
      cliente: {
        pessoa: {
          cpf: employee.get('cpf'),
          nome: employee.get('nome'),
          sobrenome: employee.get('sobrenome'),
          email: employee.get('email'),
          telefone_celular: employee.getCleanValue('telefone_celular'),
        },
        sexo: employee.get('sexo'),
        dependentes: employee.get('dependentes'),
        endereco: {
          cep: employee.getIn(['endereco', 'cep']),
          logradouro: employee.getIn(['endereco', 'logradouro']),
          numero: employee.getIn(['endereco', 'numero']),
          complemento: employee.getIn(['endereco', 'complemento']),
          bairro: employee.getIn(['endereco', 'bairro']),
          cidade: employee.getIn(['endereco', 'cidade']),
          uf: employee.getIn(['endereco', 'uf']),
        },
        documento: {
          banco: employee.getIn(['documento', 'banco']),
          tipo: employee.getIn(['documento', 'tipo']),
          agencia: employee.getIn(['documento', 'agencia']),
          agencia_dac: employee.getIn(['documento', 'agencia_dac']),
          conta: employee.getIn(['documento', 'conta']),
          conta_dac: employee.getIn(['documento', 'conta_dac']),
        },
        estado_civil: employee.get('estado_civil'),
        referencia_telefone: employee.getCleanValue('referencia_telefone'),
        referencia_nome: employee.get('referencia_nome'),
        referencia_parentesco: employee.get('referencia_parentesco'),
        nome_mae: employee.get('nome_mae'),
      },
      matricula: employee.get('matricula'),
      admitido_em: employee.get('admitido_em', 'DD/MM/YYYY'),
      salario_bruto: employee.get('salario'),
      comprometimento_outros: employee.get('valor_emprestado_outros_bancos'),
      pagamento: employee.get('pagamento'),
      cargo: employee.get('cargo'),
      inss: employee.get('inss'),
      irrf: employee.get('irrf'),
    })
  }
}
