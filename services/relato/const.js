require('dotenv/config')

const COMPANY = {
    CONSULT: 'Consult',
    GOLD: 'Gold',
    CENTRAL: 'Central',
}

if(!COMPANY[process.argv[2]]) {
  throw new Error('Argument Invalid (GOLD|CENTRAL|CONSULT)')
}

console.log(`Running: ${ COMPANY[process.argv[2]] }`)
module.exports = {
    COMPANY,
    selectedCompany: COMPANY[process.argv[2]],
}