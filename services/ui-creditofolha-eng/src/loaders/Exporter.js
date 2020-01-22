/* eslint-disable no-unused-expressions */
// @flow
import * as XLSX from 'xlsx'
import moment from 'moment'
import type { TLoader, TExporterLoader, TExcelColumn } from 'types'
import { ColumnType } from 'constants/grid'

function Exporter(): TLoader<TExporterLoader> {
  // function exportExcelFile(filename: any): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     if (!file) {
  //       return reject(new Error('Não foi possível localizar um arquivo.'))
  //     }

  //     const reader = new FileReader()
  //     const { name } = file

  //     reader.onload = () => {
  //       if (name.endsWith('.xlsx')) {
  //         const { Sheets, SheetNames } = XLSX.read(reader.result, { type: 'binary' })
  //         const ws = Sheets[SheetNames[0]]
  //         const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })

  //         return resolve(data)
  //       }
  //       return resolve(reader.result)
  //     }

  //     reader.onprogress = (ev) => {
  //       console.log(ev)
  //     }

  //     if (name.endsWith('.xlsx')) {
  //       return reader.readAsBinaryString(file)
  //     }

  //     return reader.readAsText(file)
  //   })
  // }

  function fitToColumn(columns: Array<TExcelColumn>) {
    return columns.map((column) => ({ wch: column.name.length + 5 }))
  }

  function fitFormatColumns(ws: any, columns: Array<TExcelColumn>, valuesSize: number) {
    return new Promise((resolve) => {
      const newWs = ws
      columns.forEach((column, inx) => {
        if (column.type === ColumnType.DATE) {
          const range = { s: { c: inx, r: 1 }, e: { c: inx, r: valuesSize - 1 } }

          for (let R = range.s.r; R <= range.e.r; ++R) {
            const cellAddress = { c: inx, r: R }
            const data = XLSX.utils.encode_cell(cellAddress)
            newWs[data].t = 'd'
            newWs[data].z = 'dd/mm/yyyy'
            newWs[data].s = { numFmt: 'm/dd/yy' }
            // XLSX.utils.format_cell(newWs[data])
            delete newWs[data].w
            newWs[data].v = 0
          }
        }

        if (inx === columns.length - 1) {
          resolve(newWs)
        }
      })
    })
  }

  function put(
    filename: string, title: string, columns: Array<TExcelColumn>, values: Array<Object>
  ): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!values || !Array.isArray(values)) {
        reject(new Error('[TExporter]: Values is not a valid array'))
        return
      }

      try {
        const json = values.map<Object>(row => {
          return Object.keys(row).reduce<Object>((obj: Object, col: string) => {
            const column = columns.find(colIn => colIn.key === col)
            if (column) {
              const value = row[col]
              if (column.type === ColumnType.DATE) {
                return {
                  ...obj,
                  [column.name]: typeof value === 'string' && value.length > 10 ? moment(value, 'DD/MM/YYYY').toDate() : undefined,
                }
              }
              return {
                ...obj,
                [column.name]: row[col],
              }
            }
            return {
              ...obj,
              [col]: row[col],
            }
          }, {})
        })


        const ws = XLSX.utils.json_to_sheet(json, { cellDates: true })
        ws['!cols'] = fitToColumn(columns)
        fitFormatColumns(ws, columns, values.length).then((nws) => {
          const wb = XLSX.utils.book_new()
          XLSX.utils.book_append_sheet(wb, nws, title)
          XLSX.writeFile(wb, filename, { cellDates: true, cellStyles: true })
          resolve()
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  return {
    load: async () => {
      return {
        put,
      }
    },
  }
}

export default Exporter
