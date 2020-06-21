import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
  FilterBuilder
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from '@loopback/rest';
import { Company } from '../models';
import { CompanyRepository } from '../repositories';
import { Gold, Central, Consult } from '../services';
import { inject } from '@loopback/core';
import {
  QuerySacados,
  QueryCedentes,
  QueryTitulos,
  QueryConfigs
} from '../interfaces/relato.interface';

type Code = 'gold' | 'consult' | 'central';

export class CompanyController {
  constructor(
    @repository(CompanyRepository)
    public companyRepository: CompanyRepository,
    @inject('services.Gold')
    protected goldService: Gold,
    @inject('services.Central')
    protected centralService: Central,
    @inject('services.Consult')
    protected consultService: Consult
  ) {}

  @post('/companies', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Company) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompany',
            exclude: ['id']
          })
        }
      }
    })
    company: Omit<Company, 'id'>
  ): Promise<Company> {
    return this.companyRepository.create(company);
  }

  @get('/companies/count', {
    responses: {
      '200': {
        description: 'Company model count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>
  ): Promise<Count> {
    return this.companyRepository.count(where);
  }

  @get('/companies', {
    responses: {
      '200': {
        description: 'Array of Company model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Company, { includeRelations: true })
            }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Company))
    filter?: Filter<Company>
  ): Promise<Company[]> {
    return this.companyRepository.find(filter);
  }

  @patch('/companies', {
    responses: {
      '200': {
        description: 'Company PATCH success count',
        content: { 'application/json': { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, { partial: true })
        }
      }
    })
    company: Company,
    @param.query.object('where', getWhereSchemaFor(Company))
    where?: Where<Company>
  ): Promise<Count> {
    return this.companyRepository.updateAll(company, where);
  }

  @get('/companies/{id}', {
    responses: {
      '200': {
        description: 'Company model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Company, { includeRelations: true })
          }
        }
      }
    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Company))
    filter?: Filter<Company>
  ): Promise<Company> {
    return this.companyRepository.findById(id, filter);
  }

  @patch('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, { partial: true })
        }
      }
    })
    company: Company
  ): Promise<void> {
    await this.companyRepository.updateById(id, company);
  }

  @get('/companies/sync/{code}', {
    responses: {
      '200': {
        description: 'Company SYNC success'
      }
    }
  })
  async syncCompany(
    @param.path.string('code') code: Code
  ): Promise<Company | void> {
    const services = {
      gold: this.goldService,
      central: this.centralService,
      consult: this.consultService
    };
    const [
      { sacados },
      { cedentes },
      { titulos },
      { configs }
    ] = await Promise.all<
      QuerySacados,
      QueryCedentes,
      QueryTitulos,
      QueryConfigs
    >([
      services[code].find<QuerySacados>('sacados'),
      services[code].find<QueryCedentes>('cedentes'),
      services[code].find<QueryTitulos>('titulos'),
      services[code].find<QueryConfigs>('configs')
    ]);
    const filter = new FilterBuilder<Company>().where({ code }).build();
    const company = await this.companyRepository.findOne(filter);
    if (company && company.id) {
      company.totalCedentes = cedentes.length;
      company.totalSacados = sacados.length;
      company.totalTitulos = titulos.length;
      company.cnpj = configs[0].S_EMPRESA_CNPJ;
      company.lastSync = new Date();

      const id = company.id;
      delete company.id;
      await this.companyRepository.replaceById(id, company);
      return this.companyRepository.findById(id);
    }
  }

  @get('/companies/syncAll', {
    responses: {
      '200': {
        description: 'Company SYNC success'
      }
    }
  })
  async syncCompanies(): Promise<Company[]> {
    const services = {
      gold: this.goldService,
      central: this.centralService,
      consult: this.consultService
    };

    const companies: Company[] = await this.companyRepository.find();
    for (const company of companies) {
      const [
        { sacados },
        { cedentes },
        { titulos },
        { configs }
      ] = await Promise.all<
        QuerySacados,
        QueryCedentes,
        QueryTitulos,
        QueryConfigs
      >([
        services[company.code].find<QuerySacados>('sacados'),
        services[company.code].find<QueryCedentes>('cedentes'),
        services[company.code].find<QueryTitulos>('titulos'),
        services[company.code].find<QueryConfigs>('configs')
      ]);
      company.totalCedentes = cedentes.length;
      company.totalSacados = sacados.length;
      company.totalTitulos = titulos.length;
      company.cnpj = configs[0].S_EMPRESA_CNPJ;
      company.lastSync = new Date();

      const id = company.id;
      delete company.id;
      await this.companyRepository.updateById(id, company);
    }

    return this.companyRepository.find();
  }

  @put('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() company: Company
  ): Promise<void> {
    await this.companyRepository.replaceById(id, company);
  }

  @del('/companies/{id}', {
    responses: {
      '204': {
        description: 'Company DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.companyRepository.deleteById(id);
  }
}
