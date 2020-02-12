import { LayoutWithRelations, LayoutField, RecordFieldType } from '../models'
import { HttpErrors } from '@loopback/rest'

// import { Layout, LayoutRecord, LayoutRecordType } from '../layouts/base.layout'

export class LayoutBuilder {
  private layout: LayoutWithRelations
  private parameters: { [k: string]: string }

  constructor(layout: LayoutWithRelations) {
    this.layout = layout
  }

  public addParameter(paramName: string, paramValue: string): void {
    this.parameters = {
      ...this.parameters,
      [paramName]: paramValue
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

  private getValue(record: LayoutField): string {
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

  private isProtocolValid(): boolean {
    const { protocol } = this.layout
    const protocolSize = protocol.reduce((size, record) => {
      return size + record.size
    }, 0)

    return protocolSize === 400
  }

  private isOptionsValid(): boolean {
    const { options } = this.layout
    const optionsSize = options.reduce((size, record) => {
      return size + record.size
    }, 0)

    return optionsSize === 115
  }

  private buildOptions(): string {
    if (this.isOptionsValid()) {
      const options = this.layout.getOrdered('options')
      return options.reduce((str, record) => {
        return str.concat(this.getValue(record))
      }, '')
    }
    return ''
  }

  private buildProtocol(): string {
    if (this.isProtocolValid()) {
      const protocol = this.layout.getOrdered('protocol')
      return protocol.reduce((str, record) => {
        return str.concat(this.getValue(record))
      }, '')
    }
    return ''
  }

  build() {
    const pass = '97024725Centra@2        '
    const protocol = this.buildProtocol()
    const options = this.buildOptions()
    const request = ''.concat(pass, protocol, options, 'T999')
    // const request = ''.concat(protocol)
    if (request.length !== 543) {
      throw new HttpErrors.PreconditionFailed(
        `Request Length: ${request.length}`
      )
    }
    return 'p='.concat(request)
  }
}
