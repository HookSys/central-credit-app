import {
  Request,
  RestBindings,
  get,
  requestBody,
  post,
  param
} from '@loopback/rest';
import { inject } from '@loopback/context';
import { authenticate } from '@loopback/authentication';
import { Gold } from '../services/gold.service';
import {
  GenerateRequest,
  GenerateAllRequest
} from '../interfaces/relato.interface';
import { Central } from '../services/central.service';
import { Consult } from '../services/consult.service';
import {
  RelatoGenerateResponseDto,
  RelatoGenerateRequestDto,
  RelatoGenerateAllResponseDto,
  RelatoGenerateAllRequestDto,
  RelatoFindResponseDto,
  RelatoFindByCompanyResponseDto,
  RelatoSaveResponseDto,
  RelatoSaveRequestDto
} from '../specs/relato.specs';

@authenticate('jwt')
export class RelatoController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.Gold') protected goldService: Gold,
    @inject('services.Central') protected centralService: Central,
    @inject('services.Consult') protected consultService: Consult
  ) {}

  @post('/generateAll', RelatoGenerateAllResponseDto)
  async generateAll(
    @requestBody(RelatoGenerateAllRequestDto) request: GenerateAllRequest
  ): Promise<object> {
    const gold = await this.goldService.generate(
      request.database,
      request.onlyPayments
    );
    const central = await this.centralService.generate(
      request.database,
      request.onlyPayments
    );
    const consult = await this.consultService.generate(
      request.database,
      request.onlyPayments
    );
    return {
      gold,
      central,
      consult
    };
  }

  @post('/generate/{code}', RelatoGenerateResponseDto)
  async generate(
    @requestBody(RelatoGenerateRequestDto) request: GenerateRequest
  ): Promise<object | void> {
    if (request.code === 'gold') {
      return this.goldService.generate(request.database, request.onlyPayments);
    }

    if (request.code === 'central') {
      return this.centralService.generate(
        request.database,
        request.onlyPayments
      );
    }

    if (request.code === 'consult') {
      return this.consultService.generate(
        request.database,
        request.onlyPayments
      );
    }
  }

  @get('/find/{type}', RelatoFindResponseDto)
  async find(@param.path.string('type') type: string): Promise<object> {
    const [central, gold, consult] = await Promise.all([
      this.centralService.find(type),
      this.goldService.find(type),
      this.consultService.find(type)
    ]);
    return {
      central,
      gold,
      consult
    };
  }

  @get('/find/{company}/{type}', RelatoFindByCompanyResponseDto)
  async findByCompany(
    @param.path.string('company') company: string,
    @param.path.string('type') type: string
  ): Promise<object> {
    if (company === 'central') {
      return this.centralService.find(type);
    }

    if (company === 'gold') {
      return this.goldService.find(type);
    }

    if (company === 'consult') {
      return this.consultService.find(type);
    }

    return {};
  }

  @post('/upload/{company}', RelatoSaveResponseDto)
  async save(
    @param.path.string('company') company: string,
    @requestBody(RelatoSaveRequestDto) titles: string
  ): Promise<object> {
    if (company === 'central') {
      return this.centralService.saveTitles(titles);
    }

    if (company === 'gold') {
      return this.goldService.saveTitles(titles);
    }

    if (company === 'consult') {
      return this.consultService.saveTitles(titles);
    }

    return {};
  }
}
