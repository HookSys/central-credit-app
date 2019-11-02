import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { ExitToApp } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CleanTemplate, Avatar, SvgImage, Button } from 'components'
import { userLogout, userAcceptTermsRequest } from 'actions/user'
import { ToastContext } from 'components/Atoms/ToastProvider'
import { useEngine } from 'engine'

const { Layout, Container, Content, Footer, HeaderTitle } = CleanTemplate

const UseTerms = ({ parentStructure: { ROUTES } }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { showErrorToast } = useContext(ToastContext)
  const user = useSelector(state => state.user.get('data'))

  const onRefuse = async () => {
    await dispatch(userLogout())
    setTimeout(() => history.push(ROUTES.LOGIN.URL))
  }

  const onAccept = async () => {
    const response = await dispatch(userAcceptTermsRequest())
    if (response) {
      setTimeout(() => history.push(ROUTES.PROFILES.URL))
    } else {
      showErrorToast({
        message: 'O termo de uso já foi aceito pelo usuário.',
      })
    }
  }

  return (
    <Layout className='use-terms'>
      <Container size='col-12 col-md-7'>
        <Content>
          <HeaderTitle className='mt-2 mb-3'>
            Termos de Uso
          </HeaderTitle>
          <div className='use-terms-text'>
            Por meio de seus termos e condições gerais de uso e/ou de venda, um site ou um
            aplicativo explica aos usuários quais são as condições de utilização do serviço
            disponibilizado através de sua página ou programa, seja ele gratuito ou pago.
            Além de informar o usuário sobre a necessidade de cadastro ou sobre os elementos
            protegidos por direitos autorais, este instrumento determina, ainda, as
            responsabilidades de cada uma das partes - editor (pessoa que mantém o site ou
            aplicativo) e usuário -, em relação ao uso do serviço.
            A cláusula mais importante dos termos e condições gerais de uso é aquela que
            define a política de privacidade do site ou aplicativo. Nela, o editor comunica
            claramente ao usuário como serão protegidas ou utilizadas as informações que este
            fornece ao site ou ao aplicativo, sejam elas dados pessoais ou dados de navegação.
            Nos casos em que o site ou o aplicativo colocar à venda produtos ou serviços, este
            documento virá, também, complementado pelas condições gerais de venda, que regularão
            os detalhes desta transação, tais como as formas de pagamento, a entrega e a
            política
            de trocas e devoluções. Neste documento ainda será possível adaptar a política de
            privacidade do site ou aplicativo ao Regulamento Geral de Proteção de Dados da União
            Europeia (RGPD), também conhecido como General Data Protection Regulation (GDPR).
            Como utilizar este documento? Após devidamente preenchidos com as informações
            do site
            ou aplicativo, os termos e condições gerais de uso e/ou de venda devem ser colocados
            à disposição para consulta direta dos internautas, em link na própria página ou
            programa. Toda pessoa que desejar ter acesso ao serviço oferecido pelo site ou
            pelo aplicativo deverá, antes, concordar com as normas contidas neste documento.
            Por isso, no momento de início da navegação ou de cadastro do usuário, o documento
            deve ser exibido ao usuário, para que este o leia e, ao final, o aprove.
            Quando o site ou o aplicativo realizar venda de produtos ou serviços,
            as condições gerais de venda devem ser apresentadas ao cliente antes
            do registro de seu pedido. As pessoas que não concordarem com quaisquer das regras
            presentes nos termos e condições gerais de uso e/ou de venda não deverão utilizar o
            serviço; ao mesmo tempo, aqueles que efetivamente usarem o site ou o aplicativo
            estarão demonstrando a aprovação destas normas.
            Em caso de modificação deste instrumento, a sua versão atualizada deverá ser
            colocada imediatamente no site ou no aplicativo, para consulta dos usuários,
            que poderão, ainda, ser notificados via mensagem pessoal sobre as alterações
            realizadas.
            Regulamento Geral de Proteção de Dados (Regulamento n. 2016/679 da União Europeia)
            e Lei federal n. 13.709, de 14 de agosto de 2018
            O Regulamento Geral de Proteção de Dados da União Europeia (RGPD), também conhecido
            como General Data Protection Regulation (GDPR), é o regulamento adotado pelos países
            da União Europeia que estabelece normas relativas ao tratamento dos dados pessoas
            dos usuários na internet.
            A adoção do RGPD levou o Brasil a adotar uma legislação muito semelhante, o que
            permitirá que o país trate os dados pessoais dos usuários da União Europeia,
            por conferir nível de proteção semelhante ao do RGPD.
            A nova legislação estabelece uma série de normas que devem ser seguidas pelos
            sites ou aplicativos que fazem a coleta e o tratamento de dados pessoas de usuários.
            O usuário terá uma série de direitos previstos, como o acesso, a limitação, a
            eliminação, a retificação e a portabilidade dos seus dados pessoais.
            Além disso, é necessário informar ao usuário os motivos pelos quais os dados
            são coletados, quem é responsável pelo tratamento desses dados, o prazo pelo
            qual eles serão armazenados e como exercer os seus direitos.
            Será necessário, ainda, designar um profissional especializado em privacidade
            para verificar se o site ou aplicativo está cumprindo as normas do regulamento,
            o chamado Encarregado de Proteção de Dados (Data Protection Officer).
            A multa para quem não cumprir as determinações da nova legislação é de 40 milhões
            de euros ou 4% do faturamento total bruto da empresa, o que for maior, no caso de
            violação à direito de residentes da União Europeia e 2% do faturamento total bruto
            da empresa, limitado a 50 milhões de reais, em caso de violação ao direito de
            residentes do Brasil. Ainda poderão ser cumuladas outras penalidades, como multas
            diárias, publicidade da infração, entre outros.
            O Direito aplicável
            O uso da internet é regulado, no Brasil, pelo Marco Civil da Internet
            (Lei Federal n. 12.965, de 23 de abril de 2014), regulado pelo Decreto n. 8.771,
            de 11 de maio de 2016 e o tratamento de dados pessoais é regulado pela Lei federal
            n. 13.709, de 14 de agosto de 2018 (Lei de Proteção de Dados Pessoais).
            Em se tratando de comércio eletrônico, são ainda aplicáveis os dispositivos do
            Código de Defesa do Consumidor (Lei Federal n. 8.078, de 11 de setembro de 1990).
            Por fim, o site ou aplicativo poderá estar submetido ao Regulamento n. 2016/679 da
            União Europeia (Regulamento Geral de Proteção de Dados - RGPD).
          </div>
        </Content>
        <Footer>
          <Button
            onClick={onRefuse}
            className='btn btn-default btn-sm d-block ml-auto mr-2'
          >
            Recusar
          </Button>
          <Button
            onClick={onAccept}
            className='btn btn-primary btn-sm d-block'
          >
            Aceitar
          </Button>
        </Footer>
      </Container>
    </Layout>
  )
}

UseTerms.propTypes = {
  parentStructure: PropTypes.object.isRequired,
}

export default UseTerms