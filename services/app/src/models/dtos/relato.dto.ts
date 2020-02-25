import { OPERATION_SECURITY_SPEC } from '../../auth'

const RelatoGenerateSchema = {
  type: 'object',
  required: ['database', 'onlyPayments'],
  properties: {
    database: {
      type: 'string'
    },
    onlyPayments: {
      type: 'string',
      maxLength: 1
    }
  }
}

export const RelatoGenerateRequestDto = {
  description: 'Generate Relato Files',
  required: true,
  content: {
    'application/json': { schema: RelatoGenerateSchema }
  }
}
