import { get } from 'lodash'
import moment from 'moment'
import { List, Map } from 'immutable'
import BaseRecord from 'base/BaseRecord'
import BaseList, { toEntityList } from 'base/BaseList'
import CompanyFactory from 'factories/Company'
import Financial from 'models/Financial'
import Discount from 'models/Discount'
import Payment from 'models/Payment'
import PAYMENT_LOT_STATUS from 'constants/paymentLot'
import PaymentEmployeeLot from 'models/PaymentEmployeeLot'

const defaultValues = {
  id: '',
  empresa: CompanyFactory.createCompany(),
  financeira: new Financial(),
  mes_referencia: '',
  valor_previsto: 0,
  valor_descontado: 0,
  status: '',
  descontos: toEntityList([], Discount),
  pagamento: new Payment(),
  corte_em: '',
  processado_em: '',
  vencimento_em: '',
  enviado_em: '',
  conciliado_em: '',
  discountsByEmployee: toEntityList([], PaymentEmployeeLot),
}

export default class PaymentLot extends BaseRecord(defaultValues, PaymentLot) {
  constructor(values) {
    const discounts = get(values, 'descontos') ? toEntityList(values.descontos, Discount) : defaultValues.descontos
    const discountsByEmployee = BaseList.getListSorted(
      PaymentLot.getDiscountGroupedByEmployee(discounts),
      ['employee', 'fullName']
    )
    super({
      ...values,
      empresa: get(values, 'empresa') ? CompanyFactory.createCompany(values.empresa) : defaultValues.empresa,
      financeira: get(values, 'financeira') ? new Financial(values.financeira) : defaultValues.financeira,
      pagamento: get(values, 'pagamento') ? new Payment(values.pagamento) : defaultValues.pagamento,
      descontos: discounts,
      discountsByEmployee,
    })
  }

  getDifferenceValue() {
    const expectedValue = this.get('valor_previsto')
    const discountedValue = this.get('valor_descontado')
    return expectedValue - discountedValue
  }

  getFormatedReferenceMonth(format = 'MM/YYYY') {
    const referenceMonth = this.get('mes_referencia')
    if (referenceMonth) {
      const year = referenceMonth.substr(0, 4)
      const month = referenceMonth.substr(4, 2)
      return moment(`01/${ month }/${ year }`, 'DD/MM/YYYY').format(format)
    }

    return ''
  }

  isConciliated() {
    return [
      PAYMENT_LOT_STATUS.CONCILIATED,
      PAYMENT_LOT_STATUS.AUTO_CONCILIATED,
    ].includes(this.get('status'))
  }

  getByReceivable(formFieldArraysObject) {
    if (formFieldArraysObject) {
      const discountsByEmployee = this.get('discountsByEmployee')
      const result = formFieldArraysObject.reduce((discounts, formFieldArray, fieldName) => {
        const discountByEmployee = discountsByEmployee.find((item) => item.get('fieldName') === fieldName)
        const contracts = discountByEmployee.get('contracts')
        const newDiscounts = formFieldArray.reduce((fieldArrayDiscounts, discount) => {
          const receivableFromForm = discount.get('recebivel')
          const discountedValueFromForm = discount.get('valor_descontado')
          const divergenceFromForm = discount.get('divergencia')
          const hasChanged = contracts.findIndex(
            (contract) => contract.get('recebivel') === receivableFromForm
              && contract.get('valor_descontado') === discountedValueFromForm
              && contract.get('divergencia') === divergenceFromForm
          ) === -1
          if (hasChanged) {
            return fieldArrayDiscounts.push(new Map({
              divergencia: divergenceFromForm,
              valor_descontado: discountedValueFromForm,
              recebivel: receivableFromForm,
            }))
          }
          return fieldArrayDiscounts
        }, new List())
        return discounts.push(...newDiscounts)
      }, new List())
      return result
    }

    return null
  }

  static getDiscountGroupedByEmployee(discounts) {
    return discounts.reduce((paymentsEmployeeLot, discount) => {
      const employee = discount.get('funcionario')
      if (employee.get('cpf')) {
        const inx = paymentsEmployeeLot.findIndex(
          (paymentEmployeeLotIn) => paymentEmployeeLotIn.getIn(['employee', 'cpf']) === discount.getIn(['funcionario', 'cpf'])
        )
        if (inx < 0) {
          const paymentEmployeeLot = new PaymentEmployeeLot({
            employee: discount.get('funcionario'),
          })
          return paymentsEmployeeLot.push(paymentEmployeeLot.addNewContract(discount))
        }

        const paymentEmployeeLot = paymentsEmployeeLot.get(inx)
        return paymentsEmployeeLot.set(inx, paymentEmployeeLot.addNewContract(discount))
      }

      return paymentsEmployeeLot
    }, new List())
  }
}
