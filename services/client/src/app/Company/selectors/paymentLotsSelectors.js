import { createSelector } from 'reselect'
import { Map, List } from 'immutable'

export const getPaymentLots = ({ company }) => company.paymentLots.get('results')

export const getPaymentLotsGroupByYear = createSelector(
  getPaymentLots,
  (paymentLots) => {
    return paymentLots.reduce((list, paymentLot) => {
      const year = paymentLot.getFormatedReferenceMonth('YYYY')
      const index = list.findIndex((item) => item.get('year') === year)
      if (index >= 0) {
        const item = list.get(index)
        return list.set(index, item.set('items', item.get('items').push(paymentLot)))
      }
      return list.push(new Map({
        year,
        items: new List([paymentLot]),
      }))
    }, new List())
  }
)
