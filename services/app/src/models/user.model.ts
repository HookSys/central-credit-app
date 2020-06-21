import { Entity, model, property, hasOne, hasMany } from '@loopback/repository';
import { UserCredentials } from './user-credentials.model';
import { Company } from './company.model';

@model({
  settings: {
    indexes: {
      uniqueEmail: {
        keys: {
          email: 1
        },
        options: {
          unique: true
        }
      }
    }
  }
})
export class User extends Entity {
  @property({
    id: true
  })
  id: string;

  @property()
  email: string;

  @property()
  cpf: string;

  @property()
  firstName?: string;

  @property()
  lastName?: string;

  @property()
  isSuperAdmin: boolean;

  @hasOne(() => UserCredentials)
  userCredentials: UserCredentials;

  @property.array(Company)
  companies: Company[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}
