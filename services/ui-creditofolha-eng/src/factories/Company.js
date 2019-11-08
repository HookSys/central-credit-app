import Company from 'models/Company'
import CandidateCompany from 'models/CandidateCompany'

export default class CompanyFactory {
  static createCompany(values) {
    if (values && values.id) {
      return new Company(values)
    }

    return new CandidateCompany(values)
  }
}
