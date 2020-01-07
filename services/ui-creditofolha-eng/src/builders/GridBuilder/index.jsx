/* eslint-disable no-param-reassign */
import React, { forwardRef, useCallback, useRef, useState, memo, useMemo } from 'react'
// import PropTypes from 'prop-types'
import ReactDataGrid from 'react-data-grid'
import { Editors } from 'react-data-grid-addons'

import CurrencyEditor from './editors/CurrencyEditor'
import CheckboxEditor from './editors/CheckboxEditor'
import CurrencyFormatter from './formatters/CurrencyFormatter'
import CheckboxFormatter from './formatters/CheckboxFormatter'

export const COLUMN_TYPE = {
  CHECKBOX: 'checkbox',
  CURRENCY: 'numeric',
  DROPDOWN: 'dropdown',
  DATE: 'date',
}

const { DropDownEditor } = Editors

const GridBuilder = () => {
  const _columns = []
  let _initialRows = 0
  let _primaryKey = null

  const builder = {
    addColumn: (key, name, path, type, domain, width = 150, editable = true) => {
      _columns.push({
        key,
        name,
        path,
        type,
        domain,
        width,
        editable,
      })
      return builder
    },
    initialRows: initialRows => {
      _initialRows = initialRows
      return builder
    },
    primaryKey: primaryKey => {
      _primaryKey = primaryKey
      return builder
    },
    build: () => {
      const getColumns = (gridRef) => _columns.map(
        ({ key, name, editable, width, type, domain }) => {
          let editor
          let formatter
          if (type === COLUMN_TYPE.DROPDOWN) {
            editor = <DropDownEditor options={ domain } />
          } else if (type === COLUMN_TYPE.CURRENCY) {
            editor = <CurrencyEditor />
            formatter = <CurrencyFormatter />
          } else if (type === COLUMN_TYPE.CHECKBOX) {
            editor = <CheckboxEditor />
            formatter = <CheckboxFormatter />
          }

          return {
            key,
            name,
            width,
            editable,
            resizable: true,
            editor,
            formatter,
            events: {
              onClick(ev, args) {
                if (type === COLUMN_TYPE.CHECKBOX) {
                  const { current: grid } = gridRef
                  grid.openCellEditor(args.rowIdx, args.idx)
                }
              },
            },
          }
        }
      )

      const getInitialRows = (columns) => Array(_initialRows).fill().map(() => {
        return columns.reduce((obj, column, i) => {
          obj[column.key] = column.key === _primaryKey ? i : ''
          return obj
        }, {})
      })

      const GridBuilt = memo(forwardRef(() => {
        const gridRef = useRef()
        const columns = useMemo(() => getColumns(gridRef), [])
        const initialRows = useMemo(() => getInitialRows(columns), [])
        const [data, updateData] = useState(initialRows)

        const onGridRowsUpdated = useCallback(({ fromRow, toRow, updated }) => {
          const rows = data.slice()
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated }
          }
          updateData(rows)
          return { rows }
        }, [data])

        return (
          <ReactDataGrid
            ref={ gridRef }
            columns={ columns }
            rowGetter={ i => data[i] }
            rowsCount={ data.length }
            rowScrollTimeout={ null }
            enableCellSelect={ true }
            resizable={ true }
            minHeight={ 600 }
            onGridRowsUpdated={ onGridRowsUpdated }
          />
        )
      }))

      GridBuilt.displayName = 'GridBuilt'
      return GridBuilt
    },
  }

  return builder
}

export default GridBuilder
