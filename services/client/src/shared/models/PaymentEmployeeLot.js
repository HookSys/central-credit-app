import BaseRecord from 'base/BaseRecord'
import { toEntityList } from 'base/BaseList'
import Employee from 'models/Employee'
import ContractDiscount from 'models/ContractDiscount'
import { List } from 'immutable'
import { get } from 'lodash'
import { PAYMENT_LOT_REASONS } from 'constants/paymentLot'

const defaultValues = {
  fieldName: null,
  employee: new Employee(),
  contracts: toEntityList([], ContractDiscount),
  receivables: new List(),
  divergences: new List(),
  expectedValue: 0,
  discountedValue: 0,
}

export default class PaymentEmployeeLot extends BaseRecord(defaultValues, PaymentEmployeeLot) {
  constructor(values) {
    super({
      ...values,
      fieldName: get(values, 'employee') ? `_${ values.employee.get('cpf').replace(/[^\w\s]/gi, '') }` : defaultValues.formName,
    })
  }

  addNewContract(discount) {
    if (discount) {
      const contracts = this.get('contracts')
      const receivables = this.get('receivables')
      const expectedValue = this.get('expectedValue')
      const discountedValue = this.get('discountedValue')
      const divergences = this.get('divergences')

      const discountContract = discount.get('contrato')
      const discountReceivable = discount.get('recebivel')
      const discountExpectedValue = discount.get('valor_previsto')
      const discountDiscountedValue = discount.get('valor_descontado')
      const discountDivergence = discount.get('divergencia')

      return this.merge({
        contracts: contracts.push(new ContractDiscount({
          contrato: discountContract,
          recebivel: discountReceivable,
          valor_previsto: discountExpectedValue,
          valor_descontado: discountDiscountedValue,
          divergencia: discountDivergence === PAYMENT_LOT_REASONS.NONE ? '' : discountDivergence,
        })),
        receivables: receivables.push(discountReceivable),
        divergences: divergences.push(discountDivergence),
        expectedValue: expectedValue + discountExpectedValue,
        discountedValue: discountedValue + discountDiscountedValue,
      })
    }
    return this
  }
}
