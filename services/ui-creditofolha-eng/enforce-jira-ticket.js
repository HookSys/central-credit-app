/*!
 * Este script é executado no commit, adicionando o ticket do JIRA a
 * mensagem de commit.
 *
 * Ele não está presente no `.git/hooks` pois os Git Hooks deste projeto
 * são gerenciados pelo Husky, uma biblioteca Node que registra os hooks
 * no package.json do projeto.
 */

const { exec } = require('child_process')
const { readFile, writeFile } = require('fs')
const { join } = require('path')
const { promisify } = require('util')

const { startsWith } = require('lodash')

const asyncExec = promisify(exec)
const asyncReadFile = promisify(readFile)
const asyncWriteFile = promisify(writeFile)

/**
 * getTicketBranch()
 *
 * Determina se a branch atual representa um issue do JIRA
 *
 * @return {Promise<string|undefined>}
 */
async function getTicketBranch() {
  const { stdout } = await asyncExec('git status -sb')
  const ticket = /^## (CEP-\d+)/.exec(stdout)
  if (!(ticket && ticket[1])) {
    return undefined
  }

  return ticket[1]
}

/**
 * main()
 *
 * Adiciona o ticket a mensagem do commit caso ele não esteja presente e a
 * branch atual possui a identificação do ticket.
 *
 * @return {Promise<boolean>}
 */
async function main() {
  const ticket = await getTicketBranch()
  if (typeof ticket === 'undefined') {
    // eslint-disable-next-line no-console
    console.log('A mensagem de commit não será atualizada pois a branch não identifica uma issue no JIRA.')
    return true
  }

  const file = process.argv[2] || join(__dirname, '.git/COMMIT_EDITMSG')
  const commitMsg = await asyncReadFile(file)

  if (startsWith(commitMsg, ticket)) {
    // eslint-disable-next-line no-console
    console.log('A mensagem de commit não será atualizada pois já contém a identificação da issue no JIRA.')
    return true
  }


  // eslint-disable-next-line no-console
  console.log('Atualizando mensagem de commit...')
  await asyncWriteFile(file, `${ ticket } ${ commitMsg }`)
  return true
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
