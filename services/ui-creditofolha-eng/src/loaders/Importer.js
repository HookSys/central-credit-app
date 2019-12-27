/* eslint-disable no-unused-expressions */
// @flow
import * as XLSX from 'xlsx'

import type { TLoader, TImporterLoader } from 'types'

function Importer(): TLoader<TImporterLoader> {
  function readExcelFile(file: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      if (!file) {
        return reject(new Error('Não foi possível localizar um arquivo.'))
      }

      const reader = new FileReader()
      const { name } = file

      reader.onload = () => {
        if (name.endsWith('.xlsx')) {
          const { Sheets, SheetNames } = XLSX.read(reader.result, { type: 'binary' })
          const ws = Sheets[SheetNames[0]]
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })

          return resolve(data)
        }
        return resolve(reader.result)
      }

      reader.onprogress = (ev) => {
        console.log(ev)
      }

      if (name.endsWith('.xlsx')) {
        return reader.readAsBinaryString(file)
      }

      return reader.readAsText(file)
    })
  }

  function serializeExcelFile(file: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      readExcelFile(file).then((data) => {
        const serialized = data.split(/\n/)
          .filter(line => line !== '')
          .map(line => line.split(/;/))
          .map(line => {
            if (line.length === 1) {
              return line[0].split(',')
            }
            return line
          })
        resolve(serialized)
      }).catch((e) => reject(e))
    })
  }

  return {
    load: async () => {
      return {
        get: serializeExcelFile,
      }
    },
  }
}

export default Importer
