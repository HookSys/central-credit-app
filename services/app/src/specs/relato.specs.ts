import { OPERATION_SECURITY_SPEC } from '../auth';

//#region Generate
const RelatoGenerateAllRequestSchema = {
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
};

const RelatoGenerateRequestSchema = {
  type: 'object',
  required: ['database', 'onlyPayments', 'code'],
  properties: {
    database: {
      type: 'string'
    },
    onlyPayments: {
      type: 'string',
      maxLength: 1
    },
    code: {
      type: 'string'
    }
  }
};

const RelatoGenerateResponseSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean'
    }
  }
};

export const RelatoGenerateAllRequestDto = {
  description: 'Generate Relato Files',
  required: true,
  content: {
    'application/json': { schema: RelatoGenerateAllRequestSchema }
  }
};

export const RelatoGenerateAllResponseDto = {
  responses: {
    default: {
      description: 'Generate All Files',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              gold: RelatoGenerateResponseSchema,
              central: RelatoGenerateResponseSchema,
              consult: RelatoGenerateResponseSchema
            }
          }
        }
      }
    }
  },
  security: OPERATION_SECURITY_SPEC
};

export const RelatoGenerateRequestDto = {
  description: 'Generate Relato File',
  required: true,
  content: {
    'application/json': { schema: RelatoGenerateRequestSchema }
  }
};

export const RelatoGenerateResponseDto = {
  responses: {
    default: {
      description: 'Generate File',
      content: {
        'application/json': {
          schema: RelatoGenerateResponseSchema
        }
      }
    }
  },
  security: OPERATION_SECURITY_SPEC
};
//#endregion

//#region Find
const RelatoFindRequestSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    type: {
      type: 'string'
    }
  }
};

export const RelatoFindRequestDto = {
  description: 'Find Relato Informations',
  required: true,
  content: {
    'application/json': { schema: RelatoFindRequestSchema }
  }
};

export const RelatoFindResponseDto = {
  responses: {
    default: {
      description: 'Find Relato Response',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              gold: { type: 'object' },
              central: { type: 'object' },
              consult: { type: 'object' }
            }
          }
        }
      }
    }
  },
  security: OPERATION_SECURITY_SPEC
};
//#endregion

//#region Find by Company
const RelatoFindByCompanyRequestSchema = {
  type: 'object',
  required: ['type'],
  properties: {
    company: {
      type: 'string'
    },
    type: {
      type: 'string'
    }
  }
};

export const RelatoFindByCompanyRequestDto = {
  description: 'Find Relato By Company Informations',
  required: true,
  content: {
    'application/json': { schema: RelatoFindByCompanyRequestSchema }
  }
};

export const RelatoFindByCompanyResponseDto = {
  responses: {
    default: {
      description: 'Find Relato By Company Response',
      content: {
        'application/json': {
          schema: {
            type: 'object'
          }
        }
      }
    }
  },
  security: OPERATION_SECURITY_SPEC
};

//#endregion

//#region Save

export const RelatoSaveRequestDto = {
  description: 'Save Relato Files',
  required: true,
  content: {
    'text/plain': {}
  }
};

export const RelatoSaveResponseDto = {
  responses: {
    default: {
      description: 'Save Files',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              result: {
                type: 'array'
              }
            }
          }
        }
      }
    }
  }
  // security: OPERATION_SECURITY_SPEC
};

//#endregion
