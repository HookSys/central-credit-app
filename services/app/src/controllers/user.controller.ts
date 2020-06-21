import { Filter, repository } from '@loopback/repository';
import {
  post,
  del,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  put,
  requestBody
} from '@loopback/rest';
import { User } from '../models';
import { UserRepository, Credentials } from '../repositories';
import { TokenServiceBindings, UserServiceBindings } from '../keys';
import { TokenService, UserService } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { UserCredentialsRequestDto } from '../specs/user-credentials.specs';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>
  ) {}

  @post('/users', {
    responses: {
      '200': {
        description: 'User model registration',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['id']
          })
        }
      }
    })
    user: Omit<User, 'id'>
  ): Promise<User> {
    const newUser = await this.userRepository.create(user);
    await this.userRepository
      .userCredentials(newUser.id)
      .create({ password: 'Trocar123' });
    return newUser;
  }

  @post('/setup', {
    responses: {
      '200': {
        description: 'User setup registration',
        content: { 'application/json': { schema: getModelSchemaRef(User) } }
      }
    }
  })
  async setup(): Promise<User> {
    const newUser = await this.userRepository.create({
      email: 'admin@admin.com',
      cpf: '00',
      isSuperAdmin: true
    });
    await this.userRepository
      .userCredentials(newUser.id)
      .create({ password: 'admin' });
    return newUser;
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User, { includeRelations: true })
          }
        }
      }
    }
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(User, { includeRelations: true })
            }
          }
        }
      }
    }
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(User))
    filter?: Filter<User>
  ): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success'
      }
    }
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, { partial: true })
        }
      }
    })
    user: User
  ): Promise<User> {
    await this.userRepository.updateById(id, user);
    return this.userRepository.findById(id);
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'User PUT success'
      }
    }
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User
  ): Promise<User> {
    await this.userRepository.replaceById(id, user);
    return this.userRepository.findById(id);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success'
      }
    }
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    }
  })
  async login(
    @requestBody(UserCredentialsRequestDto) credentials: Credentials
  ): Promise<{ user: User; token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return { user, token };
  }
}
