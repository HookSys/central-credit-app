import createQuery from 'helpers/createQuery'

export const employeesListQuery = createQuery([
  'id',
  'nome',
  'sobrenome',
  'status',
  'matricula',
  'possui_acesso',
])
