import { get } from 'lodash'
import Shareholder from 'models/Shareholder'
import PartnerParticipation from 'models/PartnerParticipation'
import BaseRecord from './utils/BaseRecord'
import { toEntityList } from './utils/BaseList'

const defaultValues = {
  controle_acionario: 'nacional',
  acionistas: toEntityList([], Shareholder),
  participacoes_societarias: toEntityList([], PartnerParticipation),
}

export default class Actions extends BaseRecord(defaultValues, Actions) {
  constructor(values) {
    super({
      ...values,
      acionistas: get(values, 'acionistas') ? toEntityList(values.acionistas, Shareholder) : defaultValues.acionistas,
      participacoes_societarias: get(values, 'participacoes_societarias')
        ? toEntityList(values.participacoes_societarias, PartnerParticipation)
        : defaultValues.participacoes_societarias,
    })
  }
}
