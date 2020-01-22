/* eslint-disable no-use-before-define */
// @flow

import type { TColumnType } from 'constants/grid'

export type TExporterLoader = {
  put(
    filename: string,
    title: string,
    columns: Array<TExcelColumn>,
    values: Array<Map<string, string>>
  ): Promise<any>,
}


export type TExcelColumn = {
  key: string,
  name: string,
  type: TColumnType,
  width: number,
  editable: boolean,
  resizable: boolean,
}
