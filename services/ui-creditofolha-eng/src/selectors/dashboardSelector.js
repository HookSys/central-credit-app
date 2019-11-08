import { createSelector } from 'reselect'
import { Map, List } from 'immutable'
import moment from 'moment'
import { getContracts } from './contractsSelector'

export const getDashboardInfos = createSelector(
  getContracts,
  (contracts) => {
    const grouppedContracts = contracts.reduce((result, contract) => {
      const contractDate = contract.get('efetivado_em')
      if (!contractDate) {
        return result
      }

      const dateKey = moment(contractDate, 'YYYY-MM-DD').format('MMM')
      if (result.keySeq().toArray().includes(dateKey)) {
        return result.set(dateKey, result.get(dateKey).push(contract))
      }

      const newKey = new List()
      return result.set(dateKey, newKey.push(contract))
    }, new Map())
    const grouppedContractsKeys = grouppedContracts.keySeq().toArray()
    const contractsLength = grouppedContractsKeys.reduce((result, key) => {
      const currentContract = grouppedContracts.get(key)
      result.push(currentContract.size)
      return result
    }, [])
    const currentMonth = moment().format('MMM')
    const dashboardColors = grouppedContractsKeys.map(key => (key === currentMonth ? 'rgb(221, 221, 221)' : 'rgb(16, 127, 232)'))
    const dashboardObject = new Map({
      data: contractsLength,
      keys: grouppedContractsKeys,
      backgroundColors: dashboardColors,
    })
    return dashboardObject
  }
)
