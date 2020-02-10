import { RecordFieldType as LayoutRecordType } from '../models/record.model'

export interface LayoutRecord {
  seq: number
  size: number
  type: LayoutRecordType
  value?: string
  description?: string
}

export interface Layout {
  name: string
  protocol: LayoutRecord[]
  options: LayoutRecord[]
}

export const LayoutParams = {
  NumDoc: ':num_doc',
  TipoPessoa: ':tipo_pessoa',
  BaseCons: ':base_cons',
  Modalidade: ':modalidade',
  VlrConsul: ':vlr_consul',
  CentroCust: ':centro_cust',
  Codificado: ':codificado',
  QtdReg: ':qtd_reg',
  Conversa: ':conversa',
  Funcao: ':funcão',
  TpConsulta: ':tp_consulta',
  Atualiza: ':atualiza',
  IdentTerm: ':ident_term',
  Rescli: ':rescli',
  Delts: ':delts',
  Cobra: ':cobra',
  Passa: ':passa',
  ConsCollec: ':cons_collec',
  Localizador: ':localizador',
  DocCredor: ':doc_credor',
  QtdeCheque: ':qtde_cheque',
  EndTel: ':end_tel',
  QtdCho1: ':qtd_cho1',
  ScoCho1: ':sco_cho1',
  TarCho1: ':tar_cho1',
  NaoCobrBureau: ':nao_cobr_bureau',
  AutoPosit: ':auto_posit',
  BureauViaSiteTransacional: ':bureau_via_site_transacional',
  QuerTel9DigX: ':quer_tel_9_dig_x',
  CtaCorrent: ':cta_corrent',
  DgCtaCorr: ':dg_cta_corr',
  Agencia: ':agencia',
  Alerta: ':alerta',
  Logon: ':logon',
  ViaInternet: ':via_internet',
  Resposta: ':resposta',
  PeriodoCompro: ':periodo_compro_',
  PeriodoEndereco: ':periodo_endereco',
  Backtest: ':backtest',
  DtQuality: ':dt_quality',
  Prdorigem: ':prdorigem',
  Trnorigem: ':trnorigem',
  Consultante: ':consultante',
  TpOr: ':tp_or',
  CnpjSoftw: ':cnpj_softw',
  Filler: ':filler',
  QtdCompr: ':qtd_compr',
  Negativos: ':negativos',
  Cheque: ':cheque',
  DataConsul: ':data_consul',
  HoraConsul: ':hora_consul',
  TotalReg: ':total_reg',
  QtdReg1: ':qtd_reg1',
  CodTab: ':cod_tab',
  Itemtsdados: ':itemtsdados',
  TsDados: ':ts_dados',
  TsScore1: ':ts_score1',
  TsBp49: ':ts_bp49',
  TsAutor: ':ts_autor',
  ItemtsAutor: ':itemts_autor',
  ItemtsScor1: ':itemts_scor1',
  ItemtsBp49: ':itemts_bp49',
  ItemtsDados2: ':itemts_dados2',
  TsDados2: ':ts_dados2',
  Fase: ':fase',
  Fase2: ':fase2',
  Dbtabela: ':dbtabela',
  CodAut: ':cod_aut',
  Operid: ':operid',
  ReciCompr: ':reci_compr',
  ReciPagto: ':reci_pagto',
  AcessRechq: ':acess_rechq',
  TemOcorRechq: ':tem_ocor_rechq',
  Reservado: ':reservado'
} as const

export const LayoutParamsoP = {
  TipoReg: ':tipo_reg',
  Cod1: ':cod1',
  Chave1: ':chave1',
  Cod2: ':cod2',
  Chave2: ':chave2',
  Cod3: ':cod3',
  Chave3: ':chave3',
  Cod4: ':cod4',
  Chave4: ':chave4',
  Filler: ':filler'
} as const

export type LayoutParamsType = typeof LayoutParams
export type LayoutParamsPType = typeof LayoutParams

const LayoutObj: Layout = {
  name: 'CREDNET',
  protocol: [
    {
      seq: 1,
      size: 4,
      type: LayoutRecordType.STRING,
      value: 'B49C',
      description:
        'Preencher com “B49C”. Obs.: Quando for utilizada a porta de comunicação Host–Host, preencher com “brancos”.'
    },
    {
      seq: 5,
      size: 6,
      type: LayoutRecordType.STRING,
      description:
        'Preencher com o código da estação chamadora no cliente (identificação de terminal ou computador). Obs.: Quando for utilizada a porta de comunicação Host–Host, preencher com “brancos”.'
    },
    {
      seq: 11,
      size: 15,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.NumDoc,
      description:
        'Informar o número do CPF (com 11 dígitos) ou o número do CNPJ (com 15 posições).'
    },
    {
      seq: 26,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TipoPessoa,
      description: 'Informar "F" = pessoa física; “J” = pessoa jurídica.'
    },
    {
      seq: 27,
      size: 6,
      type: LayoutRecordType.STRING,
      value: LayoutParams.BaseCons,
      description:
        'Informar base de dados para consulta:, C = Base Compartilhada ,  I = Base da Própria Empresa (“Base individual”),  F = Base de Financeiras,  H = Base da Holding'
    },
    {
      seq: 33,
      size: 2,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Modalidade,
      description:
        'Informar a Modalidade de Consulta. , Ex: CH = Cheque, FI = Financiamento, Obs.: Obter códigos na tabela de modalidades (ver “Tabelas de Dados do Credit Bureau”). '
    },
    {
      seq: 35,
      size: 7,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.VlrConsul,
      description: 'Informar valor da consulta (inteiros)'
    },
    {
      seq: 42,
      size: 12,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.CentroCust,
      description:
        'Informar Centro de Custo , Obs.: Como é opcional, informar brancos se não for usar esse dado.'
    },
    {
      seq: 54,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Codificado,
      description: 'Informar se deseja receber campos Codificados? (S/N) '
    },
    {
      seq: 55,
      size: 2,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.QtdReg,
      description:
        'Indicar a quantidade de registros por transmissão de dados que deseja receber.'
    },
    {
      seq: 57,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Conversa,
      description:
        'Informar se deseja diálogo de comunicação? (S/N), Obs.: , > Quando a resposta à pergunta for “N”, o sistema enviará até 31 registros (recebidos e consultados), além do protocolo e encerrará a consulta ao CPF solicitado. , > Quando a resposta for “S”, o sistema vai devolver o Protocolo a cada consulta, informando “FIM” na seqüência 12 se todos os dados do CPF consultado foram enviados, “CON” se houver mais dados sobre o CPF. O código “ERR” significa que houve erro e, nesse caso, o sistema devolve o Protocolo e o registro T999 com códigos e mensagens de erro.'
    },
    {
      seq: 58,
      size: 3,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Funcao,
      description:
        'Usar as funções: INI, CON, ENC, ERR, TMD, FIM, conforme Nota do Protocolo, Obs.: A instituição participante deve enviar “INI” para iniciar uma nova consulta de CPF, “CON” se quiser receber mais dados de um CPF e “ENC” para comunicar que está encerrando a consulta ao CPF e não deseja receber mais dados. As demais funções foram explicadas na seqüência 11.'
    },
    {
      seq: 61,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TpConsulta,
      description:
        'Informar o tipo de consulta, conforme tabela de opções de uso do layout'
    },
    {
      seq: 62,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Atualiza,
      description: 'Atualiza dados enviados ? (S/N)'
    },
    {
      seq: 63,
      size: 18,
      type: LayoutRecordType.STRING,
      value: LayoutParams.IdentTerm,
      description: 'Uso reservado para o IST'
    },
    {
      seq: 81,
      size: 10,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Rescli,
      description: 'Uso da SERASA'
    },
    {
      seq: 91,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Delts,
      description: 'Uso da SERASA '
    },
    {
      seq: 92,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Cobra,
      description: 'Uso da SERASA '
    },
    {
      seq: 93,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Passa,
      description:
        'Registra consulta. Obs.: Se informar D, trata–se de consulta feita por distribuidores.'
    },
    {
      seq: 94,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ConsCollec,
      description: 'Consulta ao Collection ? (S/N) '
    },
    {
      seq: 95,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Localizador,
      description: 'Uso da SERASA '
    },
    {
      seq: 96,
      size: 9,
      type: LayoutRecordType.STRING,
      value: LayoutParams.DocCredor,
      description: 'Uso da SERASA '
    },
    {
      seq: 105,
      size: 2,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.QtdeCheque,
      description: 'Quantidade de cheques seqüenciais'
    },
    {
      seq: 107,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.EndTel,
      description:
        'Deseja receber Endereços e Telefones Alternativos? (S/N/P) , Obs.: Ao informar P são enviados os endereços e telefones alternativos priorizados. A priorização é feita considerando a “nota” do bloco (que pondera fornecedor e data da informação) em ordem decrescente – ou seja, do melhor ao pior endereço. Além disso, são eliminadas as duplicidades em endereços de um mesmo registro – ou seja, não há endereços idênticos dentro do B369. Porém, não ocorre a eliminação de duplicidade de endereços entre os registros de endereços alternativos – B369 e B370.'
    },
    {
      seq: 108,
      size: 2,
      type: LayoutRecordType.STRING,
      value: LayoutParams.QtdCho1,
      description: 'Uso da SERASA. Quantidade calculada para o score CHO1'
    },
    {
      seq: 110,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ScoCho1,
      description: 'Uso da SERASA. Cálculo score CHO1 – S ou N'
    },
    {
      seq: 111,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TarCho1,
      description: 'Uso da SERASA. Tarifa score CHO1'
    },
    {
      seq: 112,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.NaoCobrBureau,
      description: 'Uso da SERASA. Não cobrar Bureau'
    },
    {
      seq: 113,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.AutoPosit,
      description:
        'Cidadão libera ou não o POSITIVO, ‘S’ – autoriza, ‘N’ – não autoriza, ‘C’ – cancela a autorização'
    },
    {
      seq: 114,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.BureauViaSiteTransacional,
      description:
        'Uso da Serasa.  Informar ‘S’ nas consultas ao produto Bureau, via site transacional. Nos demais casos, iniciar o campo com o valor default.'
    },
    {
      seq: 115,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.QuerTel9DigX,
      description:
        'Indica quando cliente quer consultar/atualizar telefones com 9 dígitos., ‘S’                  =>  Quer consultar/atualizar telefone com 9 dígitos, Outros valores =>  Quer consultar/atualizar telefone com 8 dígitos '
    },
    {
      seq: 116,
      size: 10,
      type: LayoutRecordType.STRING,
      value: LayoutParams.CtaCorrent,
      description: 'Número da Conta Corrente (para solicitar Recheque on–line)'
    },
    {
      seq: 126,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.DgCtaCorr,
      description: 'Dígito da Conta Corrente (para solicitar Recheque on–line)'
    },
    {
      seq: 127,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Agencia,
      description:
        'Número da Agencia da Conta Corrente (para solicitar Recheque on–line)'
    },
    {
      seq: 131,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Alerta,
      description: 'Quer Alerta se possuir negativos ? (S/N)'
    },
    {
      seq: 132,
      size: 8,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Logon,
      description: 'Informar Logon de acesso'
    },
    {
      seq: 140,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ViaInternet,
      description:
        'Uso da SERASA. Informar se o meio de acesso interno da Serasa é Internet.'
    },
    {
      seq: 141,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Resposta,
      description:
        'Forma de Recebimento dos Dados para:, Credit Bureau:, 1– String de dados(default), , 2– Relatório formato texto, , 3– XML (em desenvolvimento ), , 5 – String de dados + Relatório, Achei Recheque:, 1– String de dados(default ), , 4 – Relatório formato texto, , 6 – String de dados + Relatório'
    },
    {
      seq: 142,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.PeriodoCompro,
      description:
        'Período de visualização de compromissos a partir da data do contrato. 1 = 12 meses; 2 = 24 meses; 3 = 36 meses; (seguir seqüência até 8); 9 = todos'
    },
    {
      seq: 143,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.PeriodoEndereco,
      description:
        'Período de visualização de endereços. 1 = 12 meses; 2 = 24 meses; 3 = 36 meses; (seguir seqüência até 8); 9 = todos'
    },
    {
      seq: 144,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Backtest,
      description: 'Uso da SERASA. Informar se é Backtest.'
    },
    {
      seq: 145,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.DtQuality,
      description: 'Processamneto é Dataquality ( S / N )'
    },
    {
      seq: 146,
      size: 2,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Prdorigem,
      description: 'Produto de Origem'
    },
    {
      seq: 148,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Trnorigem,
      description: 'Transação de Origem'
    },
    {
      seq: 152,
      size: 15,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.Consultante,
      description:
        'Informar o CNPJ da empresa consultante com 15 posições (com filial e dígito). Ex: 62.173.620/0001–80 –> informar 062173620000180 (Exclusivo para Distribuidores Do Credit Bureau)'
    },
    {
      seq: 167,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TpOr,
      description: 'Tipo origem:1 = Softwarehouse'
    },
    {
      seq: 168,
      size: 9,
      type: LayoutRecordType.NUMBER,
      value: LayoutParams.CnpjSoftw,
      description: 'CNPJ da Softwarehouse'
    },
    {
      seq: 177,
      size: 15,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Filler,
      description: 'Filler'
    },
    {
      seq: 192,
      size: 2,
      type: LayoutRecordType.STRING,
      value: LayoutParams.QtdCompr,
      description: 'Quantidade de compromissos encontrados'
    },
    {
      seq: 194,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Negativos,
      description:
        'S = Tem Anotação Negativa; N = Não tem e “brancos” = Não solicitou Resumo '
    },
    {
      seq: 195,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Cheque,
      description:
        'S = Cheque com anotação; N = Cheque sem anotação, “brancos” = Não consultou '
    },
    {
      seq: 196,
      size: 8,
      type: LayoutRecordType.STRING,
      value: LayoutParams.DataConsul,
      description: 'Data de realização da consulta (AAAAMMDD)'
    },
    {
      seq: 204,
      size: 6,
      type: LayoutRecordType.STRING,
      value: LayoutParams.HoraConsul,
      description: 'Horário de realização da consulta (HHMMSS)'
    },
    {
      seq: 210,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TotalReg,
      description:
        'Informa o total de registros encontrados na consulta efetuada'
    },
    {
      seq: 214,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.QtdReg1,
      description:
        'Indica a quantidade de registros que se está enviando por transmissão de dados.'
    },
    {
      seq: 218,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.CodTab,
      description: 'Número de controle de atualização das tabelas'
    },
    {
      seq: 222,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Itemtsdados,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 226,
      size: 16,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TsDados,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 242,
      size: 16,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TsScore1,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 258,
      size: 16,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TsBp49,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 274,
      size: 16,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TsAutor,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 290,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ItemtsAutor,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 294,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ItemtsScor1,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 298,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ItemtsBp49,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 302,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ItemtsDados2,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 306,
      size: 16,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TsDados2,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 322,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Fase,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 323,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Fase,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 324,
      size: 30,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Dbtabela,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 354,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.CodAut,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 355,
      size: 3,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Operid,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 358,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ReciCompr,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 359,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.ReciPagto,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    },
    {
      seq: 360,
      size: 38,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Filler,
      description: 'Filler'
    },
    {
      seq: 398,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.AcessRechq,
      description: 'Acessou Recheque Online? (S/N) '
    },
    {
      seq: 399,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.TemOcorRechq,
      description: 'Tem ocorrência de Recheque no último ano? (S/N) '
    },
    {
      seq: 400,
      size: 1,
      type: LayoutRecordType.STRING,
      value: LayoutParams.Reservado,
      description:
        'Uso da SERASA. Manter os dados recebidos na mesma consulta sem alterar'
    }
  ],
  options: [
    {
      seq: 1,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.TipoReg,
      description:
        'Registro P002 – OUTRAS OPÇÕES DE CONSULTAS. Usar esse registro quando desejar consultar também outros produtos, features e bases. - Obs.: Esse registro pode se repetir.'
    },
    {
      seq: 5,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Cod1,
      description: 'Código necessário para a consulta = RE02'
    },
    {
      seq: 9,
      size: 21,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Chave1,
      description: '  - Chave de acesso para consultar a 1ª opção se necessário'
    },
    {
      seq: 30,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Cod2,
      description:
        'Features disponíveis neste registro :, "RELA – Localizador (opção de consulta = CH, somente para consultas a CPF), RELA – Localizador (opção de consulta = CH, somente para consultas a CPF), RELB – Localizador (opção de consulta = PP, PR, somente para consultas a CPF), CLC7 – Limite de crédito (opção de consulta PP, somente para consultas a CPF), CGFN – Gasto Estimado (opção de consulta = PP e PR, somente para consultas a CPF), CGJN - GASTO ESTIMADO PJ com relatório (acessada no meio WEB/STRING com relatório CREDNET), CGJI - GASTO ESTIMADO PJ isolado (acessada no meio WEB/STRING de forma isolada), C8FD – FATURAMENTO PRESUMIDO isolado (acessada no meio WEB de forma isolada), PXSH – ALERTA IDENTIDADE PJ com relatório (acessada no meio WEB com relatório CREDNET), PXSI – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de MENSAGEM), PXSJ – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de PONTUAÇÃO), PXSK – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de PONTUAÇÃO E MENSAGEM), SPD3 - Anotações e Consultas SPC PJ com relatório (acessada no meio WEB e STRING com relatório CREDNET). , SSCN – situação Fiscal PJ para WEB e String., QSCN  -  Sócios e Administradores mais completo, Para receber os flags de inconsistências dos socios e administradores é necessário enviar “S” no 1 Byte da chave QSCN, Exmplo: “P002QSCNS                    ”, NRC7  - SPC para Sócios e Administradores mais completo. Deve ser solicitado, juntamente, com a feature QSCN., REQC – SPC para Sócios e Administradores mais completo com Consultas SPC para Sócios e Administradores. Deve ser solicitado, juntamente, com a feature QSCN., MSM5 – Mosaic PF – (acesso meio string), SPF2 - Anotações e Consultas SPC PF com relatório (acessada no meio WEB e STRING com relatório CREDNET ou Isolada). , RKP8 – Risco de crédito do perfil PF – deve ser acessada juntamente com a feature Score Serasa (RECP) ou Score Serasa com SPC (RESP)., NRCB - Consultas Detalhadas à Serasa, para PJ., NRF3C66M – Serasa Score Empresas e Setorial 6.0 -, para PJ., P8JSC66M – Serasa Score Empresas PJ 6.0., RECD – Renda Pró PF, RECF – Capacidade Mensal de Pagamento PF, RECH – Comprometimento Mensal Estimado PF, REM1 – Vendas com Cartão PJ, REIR – Indicador de Recuperação de Dividas PJ, REI1 – Indice Relacionamento Mercado e Setor, REIC - Indicador de Recuperação de Credito, RMF9 – Indice de Relacionamento de Mercado e Setor - PF", RELB – Localizador (opção de consulta = PP, PR, somente para consultas a CPF), CLC7 – Limite de crédito (opção de consulta PP, somente para consultas a CPF), CGFN – Gasto Estimado (opção de consulta = PP e PR, somente para consultas a CPF), CGJN - GASTO ESTIMADO PJ com relatório (acessada no meio WEB/STRING com relatório CREDNET), CGJI - GASTO ESTIMADO PJ isolado (acessada no meio WEB/STRING de forma isolada), C8FD – FATURAMENTO PRESUMIDO isolado (acessada no meio WEB de forma isolada), PXSH – ALERTA IDENTIDADE PJ com relatório (acessada no meio WEB com relatório CREDNET), PXSI – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de MENSAGEM), PXSJ – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de PONTUAÇÃO), PXSK – ALERTA IDENTIDADE PJ com relatório (acessada no meio STRING com relatório CREDNET. Retorno de PONTUAÇÃO E MENSAGEM), SPD3 - Anotações e Consultas SPC PJ com relatório (acessada no meio WEB e STRING com relatório CREDNET). , SSCN – situação Fiscal PJ para WEB e String., QSCN  -  Sócios e Administradores mais completo, Para receber os flags de inconsistências dos socios e administradores é necessário enviar “S” no 1 Byte da chave QSCN, Exmplo: “P002QSCNS                    ”, NRC7  - SPC para Sócios e Administradores mais completo. Deve ser solicitado, juntamente, com a feature QSCN., REQC – SPC para Sócios e Administradores mais completo com Consultas SPC para Sócios e Administradores. Deve ser solicitado, juntamente, com a feature QSCN., MSM5 – Mosaic PF – (acesso meio string), SPF2 - Anotações e Consultas SPC PF com relatório (acessada no meio WEB e STRING com relatório CREDNET ou Isolada). , RKP8 – Risco de crédito do perfil PF – deve ser acessada juntamente com a feature Score Serasa (RECP) ou Score Serasa com SPC (RESP)., NRCB - Consultas Detalhadas à Serasa, para PJ., NRF3C66M – Serasa Score Empresas e Setorial 6.0 -, para PJ., P8JSC66M – Serasa Score Empresas PJ 6.0., RECD – Renda Pró PF, RECF – Capacidade Mensal de Pagamento PF, RECH – Comprometimento Mensal Estimado PF, REM1 – Vendas com Cartão PJ, REIR – Indicador de Recuperação de Dividas PJ, REI1 – Indice Relacionamento Mercado e Setor, REIC - Indicador de Recuperação de Credito, RMF9 – Indice de Relacionamento de Mercado e Setor - PF'
    },
    {
      seq: 34,
      size: 21,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Chave2,
      description: '  - Chave de acesso para consultar a 2ª opção se necessário'
    },
    {
      seq: 55,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Cod3,
      description:
        'Código da 3ª opção para consultar outro produto, feature ou base'
    },
    {
      seq: 59,
      size: 21,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Chave3,
      description: '  - Chave de acesso para consultar a 3ª opção se necessário'
    },
    {
      seq: 80,
      size: 4,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Cod4,
      description:
        'Código da 4ª opção para consultar outro produto, feature ou base'
    },
    {
      seq: 84,
      size: 21,
      type: LayoutRecordType.STRING,
      value: LayoutParamsoP.Chave4,
      description: '  - Chave de acesso para consultar a 4ª opção se necessário'
    },
    {
      seq: 105,
      size: 11,
      type: LayoutRecordType.STRING,
      description: 'Filler'
    }
  ]
}

export default LayoutObj
