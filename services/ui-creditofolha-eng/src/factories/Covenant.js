import { months } from 'constants/months'
import Helpers from 'helpers'
import Covenant from 'models/Covenant'
import { fromJS, List } from 'immutable'

export default class CovenantFactory {
  static getLastTwoYears = () => {
    const currentYear = new Date().getFullYear()
    return [currentYear - 2, currentYear - 1]
  }

  static getBulkTaxesGroupRequestValues(covenants, requestForm, isRenegotiate) {
    const covenantIds = covenants.reduce((list, obj) => {
      return list.push(obj.get('id'))
    }, new List())

    return {
      convenios_id: covenantIds,
      convenios_data: isRenegotiate
        ? requestForm.set('taxas_grupo_renegociacao', requestForm.get('taxas_grupo')).delete('taxas_grupo')
        : requestForm,
    }
  }

  static getCovenantConfigRequestValues(covenant, requestForm) {
    const keysToRemove = ['empresa']
    if (requestForm.get('dias_cobranca_multa') === covenant.get('dias_cobranca_multa')) {
      keysToRemove.push('dias_cobranca_multa')
    }

    const configCovenantForm = Helpers.removeEmptyKeysFromMap(requestForm.deleteAll(keysToRemove))
    return configCovenantForm
  }

  static getRequestValues(requestForm) {
    const covenantForm = Helpers.removeEmptyKeysFromMap(requestForm.deleteAll(['dias_cobranca_multa', 'financeira', 'homologacao', 'id', 'idade_maxima', 'idade_minima',
      'limite_financiado', 'margem_emprestimo', 'margem_recisao', 'pagamento',
      'regras_salario_bruto', 'status', 'taxas_grupo', 'taxas_grupo_renegociacao']))

    const covenantCompany = Helpers.removeEmptyKeysFromMap(covenantForm.get('empresa')).deleteAll(['fundada_em'])
    const covenantMonths = covenantCompany.get('months')
    const years = this.getLastTwoYears()

    const billing = years.reduce((billingList, year) => {
      const billingObject = {
        ano: year.toString(),
        valores: covenantMonths.reduce((list, month) => {
          const billingMonth = month.get('billing')
          const yearIndex = billingMonth.findIndex((monthYear) => Object.keys(monthYear.toJS())[0] === `y${ year }`)
          list.push({
            mes: month.get('name'),
            valor: billingMonth.get(yearIndex).get(`y${ year }`),
          })
          return list
        }, []),
      }
      billingList.push(billingObject)
      return billingList
    }, [])

    const indebtedness = years.reduce((indebtednessList, year) => {
      const indebtednessObject = {
        ano: year.toString(),
        valores: covenantMonths.reduce((list, month) => {
          const indebtednessMonth = month.get('indebtedness')
          const yearIndex = indebtednessMonth.findIndex((monthYear) => Object.keys(monthYear.toJS())[0] === `y${ year }`)
          list.push({
            mes: month.get('name'),
            valor: indebtednessMonth.get(yearIndex).get(`y${ year }`),
          })
          return list
        }, []),
      }
      indebtednessList.push(indebtednessObject)
      return indebtednessList
    }, [])

    const contacts = covenantCompany.get('contatos').map((contact) => {
      return Helpers.removeEmptyKeysFromMap(contact)
    })

    const shareholders = covenantCompany.getIn(['acoes', 'acionistas']).map((shareholder) => {
      return Helpers.removeEmptyKeysFromMap(shareholder)
    })

    const partnerParticipations = covenantCompany.getIn(['acoes', 'participacoes_societarias']).map((partnerParticipation) => {
      return Helpers.removeEmptyKeysFromMap(partnerParticipation)
    })

    const newCompanyForm = Helpers.removeEmptyKeysFromMap(covenantCompany.merge({
      historico_consignado: Helpers.removeEmptyKeysFromMap(covenantCompany.get('historico_consignado')).delete('ja_trabalhou'),
      patrimonial: Helpers.removeEmptyKeysFromMap(covenantCompany.get('patrimonial')),
      endereco: Helpers.removeEmptyKeysFromMap(covenantCompany.get('endereco')).deleteAll(['residencia_tempo', 'residencia_tipo']),
      contatos: contacts,
      acoes: Helpers.removeEmptyKeysFromMap(covenantCompany.get('acoes').merge({
        acionistas: shareholders,
        participacoes_societarias: partnerParticipations,
      })),
      faturamento: billing,
      endividamento: indebtedness,
    }))

    const newCovenantForm = covenantForm.merge({
      empresa: newCompanyForm,
    })

    return newCovenantForm
  }

  static getFormValues(covenant) {
    const years = this.getLastTwoYears()
    if (covenant) {
      const company = covenant.get('empresa')
      const billings = company.get('faturamento')
      const indebtednesses = company.get('endividamento')

      let totalBilling = 0
      let totalIndebtedness = 0
      const covenantMonths = Object.keys(months).map((month) => {
        return {
          name: month,
          number: months[month],
          billing: years.map((year) => {
            const billingYearIndex = billings.findIndex((billingYear) => billingYear.get('ano') === year.toString())
            const billingMonth = billings.getIn([billingYearIndex, 'valores']).find((billingMonthIn) => billingMonthIn.get('mes') === month)
            const billingYearValue = billingMonth.get('valor')
            totalBilling += billingYearValue

            return {
              [`y${ year }`]: billingYearValue,
            }
          }),
          indebtedness: years.map((year) => {
            const indebtednessYearIndex = indebtednesses.findIndex((indebtednessYear) => indebtednessYear.get('ano') === year.toString())
            const indebtednessMonth = indebtednesses.getIn([indebtednessYearIndex, 'valores']).find((indebtednessMonthIn) => indebtednessMonthIn.get('mes') === month)
            const indebtednessYearMonthValue = indebtednessMonth.get('valor')
            totalIndebtedness += indebtednessYearMonthValue

            return {
              [`y${ year }`]: indebtednessYearMonthValue,
            }
          }),
        }
      })

      return covenant.merge({
        empresa: company.merge({
          faturamento: totalBilling,
          endividamento: totalIndebtedness,
          months: fromJS(covenantMonths),
        }),
      })
    }

    return new Covenant({
      empresa: {
        contatos: [{}],
        historico_consignado: {
          ja_trabalha: true,
        },
        acoes: {
          controle_acionario: 'nacional',
        },
        months: fromJS(Object.keys(months).map((month) => {
          return {
            name: month,
            number: months[month],
            billing: years.map((year) => ({
              [`y${ year }`]: 0,
            })),
            indebtedness: years.map((year) => ({
              [`y${ year }`]: 0,
            })),
          }
        })),
      },
    })
  }
}
