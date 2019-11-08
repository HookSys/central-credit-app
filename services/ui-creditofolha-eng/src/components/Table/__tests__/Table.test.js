
import React from 'react'
import User from 'models/User'
import Base from 'models/utils/Base'
import { renderWithRedux } from 'utils/test-utils'
import { Table } from 'components/Table'

const initialState = {
  user: new Base({
    errorMessage: '',
    data: new User({ isTableToastDisabled: true }),
  }),
}

const renderTable = (props, state) => renderWithRedux(
  <Table { ...props }>
    <thead />
  </Table>,
  state
)

test('should render table', () => {
  const { container } = renderTable()
  const tree = container.firstChild
  expect(tree).toMatchSnapshot()
})

test('render Table component without toast', () => {
  const { queryByTestId } = renderTable({ showToast: true }, initialState)

  expect(queryByTestId('table-onidata-id')).toBeTruthy()
  expect(queryByTestId('table-toast-id')).toBeNull()
})

test('should Table component with toast', () => {
  const { queryByTestId } = renderTable({ showToast: true })

  expect(queryByTestId('table-onidata-id')).toBeTruthy()
  expect(queryByTestId('table-toast-id')).toBeDefined()
})
