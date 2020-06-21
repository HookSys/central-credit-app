const TitleBuilder = () => {
  let _textFrom

  const builder = {
    loadFrom: textFrom => {
      _textFrom = textFrom
      return builder
    },
    build: () => {
      const lines = _textFrom.split('\r\n')
      const built = lines.reduce(
        (res, line, i) => {
          const { titulos, relacionamentos } = res
          let { invalid } = res
          if (i !== 0 || (i !== lines.length - 1 && line.length === 129)) {
            if (line.slice(16, 18) === '05' || line.slice(16, 18) === '09') {
              titulos.push({
                S_SACADO_CNPJ: line.slice(2, 16),
                S_NUMERO_TITULO: line.slice(18, 28),
                D_DATA_EMISSAO: new Date(
                  `${line.slice(32, 34)
                  }/${
                    line.slice(34, 36)
                  }/${
                    line.slice(28, 32)}`
                ),
                S_VALOR_TITULO: line.slice(36, 49),
                D_DATA_VENCIMENTO: new Date(
                  `${line.slice(53, 55)
                  }/${
                    line.slice(55, 57)
                  }/${
                    line.slice(49, 53)}`
                ),
                D_DATA_PAGAMENTO:
                  line.slice(57, 65).trim() !== ''
                    ? new Date(
                      `${line.slice(61, 63)
                      }/${
                        line.slice(63, 65)
                      }/${
                        line.slice(57, 61)}`
                    )
                    : null,
                S_CEDENTE_CNPJ: line.slice(100, 115)
              })
            } else if (line.slice(16, 18) === '01' || line.slice(16, 18) === '08') {
              relacionamentos.push({
                S_SACADO_CNPJ: line.slice(2, 16),
                S_CLIENTE_DESDE: new Date(
                  `${line.slice(22, 24)
                  }/${
                    line.slice(24, 26)
                  }/${
                    line.slice(18, 22)}`
                ),
                S_TIPO_CLIENTE: line.slice(26, 27)
              })
            }
          } else {
            invalid = true
          }

          return { titulos, relacionamentos, invalid }
        },
        { titulos: [], relacionamentos: [], invalid: false }
      )

      return built
    }
  }

  return builder
}

export default TitleBuilder
