import { toEntityList } from 'models/utils/BaseList'
import BankAccount from 'models/BankAccount'
import BankSlip from 'models/BankSlip'

export default class PaymentTypeFactory {
  static createPaymentType(values) {
    if (Array.isArray(values)) {
      return toEntityList(values, BankSlip)
    }
    return new BankAccount(values)
  }
}
