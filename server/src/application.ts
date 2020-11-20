import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {  RestExplorerBindings,  RestExplorerComponent,} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import { JWTAuthenticationComponent } from '@loopback/authentication-jwt/dist/jwt-authentication-component';
import { AuthenticationComponent } from '@loopback/authentication/dist/authentication.component';
import { AuthorizationComponent } from '@loopback/authorization/dist/authorization-component';
import { UserServiceBindings } from '@loopback/authentication-jwt/dist/keys';
import { MongoDataSource } from './datasources';

export {ApplicationConfig};

export class EventApirestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.component(AuthorizationComponent);
    this.dataSource(MongoDataSource, UserServiceBindings.DATASOURCE_NAME);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
