/* eslint-disable no-use-before-define */
// @flow
import { Workbook as TWorkbook } from 'exceljs'
import type { TExcelColumn } from './Exporter'

export type TImporterExcelReturn<T> = {
  values: Array<T>,
  workbook: TWorkbook,
}

export type TImporterTextReturn = {
  value: string | boolean,
  name: string,
}


export type TImporterLoader = {
  text(
    file: File,
  ): Promise<TImporterTextReturn>,
  excel<T>(
    file: File,
    sheetName: string,
    columns: Array<TExcelColumn>
  ): Promise<TImporterExcelReturn<T>>,
}
