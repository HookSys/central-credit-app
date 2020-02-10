export enum LayoutRecordType {
  NUMBER = 'number',
  STRING = 'string',
  BOTH = 'both'
}

export interface LayoutRecord {
  size: number
  type: LayoutRecordType
  value?: string
}

export interface Layout {
  [record: string]: LayoutRecord[]
}

export const LayoutParams = {
  NumDoc: ':numDoc',
  PersonType: ':personType',
  BaseCons: ':baseCons',
  Modality: ':modality',
  ConsultPrice: ':consultPrice',
  CostCenter: ':costCenter',
  Encoded: ':encoded',
  Size: ':size',
  Talk: ':talk',
  Function: ':function',
  ConsultType: ':consultType',
  UpdateSentData: ':updateSentData',
  SizeChecks: ':sizeChecks',
  Logon: ':logon',
  Response: ':response',
  PeriodBuy: ':periodBuy',
  PeriodAddress: ':periodAddress'
}

const Layout: Layout = {
  header: [
    { size: 4, value: 'B49C', type: LayoutRecordType.STRING },
    { size: 6, type: LayoutRecordType.STRING },
    { size: 15, value: LayoutParams.NumDoc, type: LayoutRecordType.NUMBER },
    { size: 1, value: LayoutParams.PersonType, type: LayoutRecordType.STRING },
    { size: 6, value: LayoutParams.BaseCons, type: LayoutRecordType.STRING },
    { size: 2, value: LayoutParams.Modality, type: LayoutRecordType.STRING },
    {
      size: 7,
      value: LayoutParams.ConsultPrice,
      type: LayoutRecordType.NUMBER
    },
    { size: 12, value: LayoutParams.CostCenter, type: LayoutRecordType.BOTH },
    { size: 1, value: LayoutParams.Encoded, type: LayoutRecordType.STRING },
    { size: 2, value: LayoutParams.Size, type: LayoutRecordType.NUMBER },
    { size: 1, value: LayoutParams.Talk, type: LayoutRecordType.STRING },
    { size: 3, value: LayoutParams.Function, type: LayoutRecordType.STRING },
    { size: 1, value: LayoutParams.ConsultType, type: LayoutRecordType.STRING },
    {
      size: 1,
      value: LayoutParams.UpdateSentData,
      type: LayoutRecordType.STRING
    },
    { size: 42, type: LayoutRecordType.STRING },
    { size: 2, type: LayoutRecordType.NUMBER },
    { size: 1, value: 'N', type: LayoutRecordType.STRING },
    { size: 8, type: LayoutRecordType.STRING },
    { size: 10, type: LayoutRecordType.NUMBER },
    { size: 1, type: LayoutRecordType.NUMBER },
    { size: 4, type: LayoutRecordType.NUMBER },
    { size: 1, value: 'N', type: LayoutRecordType.STRING },
    { size: 8, value: LayoutParams.Logon, type: LayoutRecordType.STRING },
    { size: 1, type: LayoutRecordType.STRING },
    { size: 1, value: LayoutParams.Response, type: LayoutRecordType.NUMBER },
    { size: 1, value: LayoutParams.PeriodBuy, type: LayoutRecordType.NUMBER },
    {
      size: 1,
      value: LayoutParams.PeriodAddress,
      type: LayoutRecordType.NUMBER
    },
    { size: 48, type: LayoutRecordType.NUMBER },
    { size: 2, type: LayoutRecordType.NUMBER },
    { size: 1, type: LayoutRecordType.STRING },
    { size: 1, type: LayoutRecordType.STRING },
    { size: 8, type: LayoutRecordType.STRING },
    { size: 6, type: LayoutRecordType.STRING },
    { size: 4, type: LayoutRecordType.STRING },
    { size: 4, type: LayoutRecordType.NUMBER },
    { size: 4, type: LayoutRecordType.NUMBER },
    { size: 176, type: LayoutRecordType.NUMBER },
    { size: 1, type: LayoutRecordType.NUMBER },
    { size: 1, type: LayoutRecordType.STRING },
    { size: 1, type: LayoutRecordType.STRING }
  ]
}

export default Layout
