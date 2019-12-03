// Employee Status
export const EmployeeStatus = {
  ACTIVE: 'ativo',
  OFF: 'desligado',
  INVALID: 'invalidez',
  DEATH: 'obito',
  AWAY: 'afastado',
}

export const EmployeeStatusColor = {
  [EmployeeStatus.ACTIVE]: 'success',
  [EmployeeStatus.OFF]: 'danger',
  [EmployeeStatus.INVALID]: 'warning',
  [EmployeeStatus.DEATH]: 'danger',
  [EmployeeStatus.AWAY]: 'warning',
}

export const EmployeeStatusDescription = {
  [EmployeeStatus.ACTIVE]: 'Ativo',
  [EmployeeStatus.OFF]: 'Desligado',
  [EmployeeStatus.INVALID]: 'Invalidez',
  [EmployeeStatus.DEATH]: 'Óbito',
  [EmployeeStatus.AWAY]: 'Afastado',
}
