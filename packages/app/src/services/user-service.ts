// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/authentication
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
import { HttpErrors } from '@loopback/rest'
import { Credentials, UserRepository } from '../repositories/user.repository'
import { User } from '../models/user.model'
import { UserService } from '@loopback/authentication'
import { UserProfile, securityId } from '@loopback/security'
import { repository } from '@loopback/repository'

export class MyUserService implements UserService<User, Credentials> {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository
  ) {}

  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.'

    const foundUser = await this.userRepository.findOne({
      where: { email: credentials.email }
    })
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    const credentialsFound = await this.userRepository.findCredentials(
      foundUser.id
    )
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError)
    }

    return foundUser
  }

  convertToUserProfile(user: User): UserProfile {
    // since first name and lastName are optional, no error is thrown if not provided
    let userName = ''
    if (user.firstName) userName = `${user.firstName}`
    if (user.lastName)
      userName = user.firstName
        ? `${userName} ${user.lastName}`
        : `${user.lastName}`
    return { [securityId]: user.id, name: userName, id: user.id }
  }
}
