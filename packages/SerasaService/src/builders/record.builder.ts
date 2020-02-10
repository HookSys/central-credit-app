import { RecordWithRelations, RecordField, RecordFieldType } from '../models'
import { HttpErrors } from '@loopback/rest'

export class RecordBuilder {
  private record: RecordWithRelations
  private parameters: { [k: string]: string }

  constructor(record: RecordWithRelations) {
    this.record = record
  }

  public addParameter(paramName: string, paramValue: string): void {
    const { params } = this.record
    const isValidParameter = params.find(
      param => param.id === paramName.slice(1)
    )
    if (typeof isValidParameter !== 'undefined') {
      this.parameters = {
        ...this.parameters,
        [paramName.slice(1)]: paramValue
      }
    }
  }

  private getValueParameter(value?: string): string | null {
    if (value) {
      if (String(value).charAt(0) === ':') {
        const paramValue = this.parameters[value.slice(1)]
        return paramValue ? paramValue : ''
      }
      return value
    }
    return ''
  }

  private getFillSize(size: number, value: string | null): number {
    if (value) {
      const valueSize = String(value).length
      const fillSize = size - valueSize
      return fillSize > 0 ? fillSize : 0
    }
    return size
  }

  private getValue(record: RecordField): string {
    const { type } = record

    const value = this.getValueParameter(record.value)
    const size = this.getFillSize(record.size, value)

    if (value !== '' && type === RecordFieldType.NUMBER) {
      return Array(size + 1)
        .join('0')
        .concat(String(value))
    }

    return String(value).concat(Array(size + 1).join(' '))
  }

  private isValid(): boolean {
    const { fields, size } = this.record
    const fieldsSize = fields.reduce((s, field) => {
      return s + field.size
    }, 0)

    return fieldsSize === size
  }

  build(): string {
    if (!this.isValid()) {
      const { name } = this.record
      throw new HttpErrors.PreconditionFailed(
        `[Record ${name}]: Invalid Record Length`
      )
    }

    const fields = this.record.getFields()
    return fields.reduce((str, field) => {
      return str.concat(this.getValue(field))
    }, '')
  }
}
