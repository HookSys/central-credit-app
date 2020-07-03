import { BootMixin } from '@loopback/boot';
import { ApplicationConfig, BindingKey } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import { MyUserService } from './services/user-service';
import {
  AuthenticationComponent,
  registerAuthenticationStrategy
} from '@loopback/authentication';
import { MySequence } from './sequence';
import {
  TokenServiceBindings,
  UserServiceBindings,
  TokenServiceConstants
} from './keys';
import { JWTService } from './services';
import { JWTAuthenticationStrategy } from './auth/jwt-strategy';
import { SECURITY_SCHEME_SPEC } from './auth';
import { HealthBindings, HealthComponent } from '@loopback/extension-health';

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}
export const PackageKey = BindingKey.create<PackageInfo>('application.package');

const pkg: PackageInfo = require('../package.json');

export class OracleCreditApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication))
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.api({
      openapi: '3.0.0',
      info: { title: pkg.name, version: pkg.version },
      paths: {},
      components: { securitySchemes: SECURITY_SCHEME_SPEC },
      servers: [{ url: '/' }]
    });

    this.configure(HealthBindings.COMPONENT).to({
      healthPath: '/health',
      livePath: '/healthz',
      readyPath: '/healthz'
    });

    this.doBinds();
    this.component(HealthComponent);
    this.component(AuthenticationComponent);
    registerAuthenticationStrategy(this, JWTAuthenticationStrategy);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer'
    });

    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      }
    };
  }

  doBinds(): void {
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(
      TokenServiceConstants.TOKEN_SECRET_VALUE
    );

    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to(
      TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE
    );

    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.bind(UserServiceBindings.USER_SERVICE).toClass(MyUserService);
  }
}
