
import React from 'react'
import { render } from '@testing-library/react'
import { TableBody } from 'components/Table'

test('should render table body component', () => {
  const { container } = render(
    <table>
      <TableBody>
        <tr>
          <td>
            TableBody test
          </td>
        </tr>
      </TableBody>
    </table>
  )
  const tree = container.firstChild
  expect(tree).toMatchSnapshot()
})
