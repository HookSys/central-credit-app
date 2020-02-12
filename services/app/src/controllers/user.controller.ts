import { Filter, repository } from '@loopback/repository'
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  patch,
  put,
  requestBody
} from '@loopback/rest'
import { User } from '../models'
import { UserRepository, Credentials } from '../repositories'
import { UserCredentialsRequestDto } from '../models/dtos/user-credentials.dto'
import { TokenServiceBindings, UserServiceBindings } from '../keys'
import { TokenService, UserService } from '@loopback/authentication'
import { inject } from '@loopback/core'

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
    const newUser = await this.userRepository.create(user)
    await this.userRepository
      .userCredentials(newUser.id)
      .create({ password: 'daniel234 ' })
    return newUser
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
    return this.userRepository.findById(id, filter)
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
  ): Promise<void> {
    await this.userRepository.updateById(id, user)
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
  ): Promise<void> {
    await this.userRepository.replaceById(id, user)
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
  ): Promise<{ token: string }> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials)

    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user)

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile)

    return { token }
  }
}
