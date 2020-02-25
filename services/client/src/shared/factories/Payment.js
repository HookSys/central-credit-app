import { toEntityList } from 'base/BaseList'
import BankAccount from 'models/BankAccount'
import BankSlip from 'models/BankSlip'

export default class PaymentFactory {
  static createPaymentType(values) {
    if (Array.isArray(values)) {
      return toEntityList(values, BankSlip)
    }
    return new BankAccount(values)
  }
}
