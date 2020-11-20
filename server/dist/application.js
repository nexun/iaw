"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventApirestApplication = void 0;
const tslib_1 = require("tslib");
const boot_1 = require("@loopback/boot");
const rest_explorer_1 = require("@loopback/rest-explorer");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const service_proxy_1 = require("@loopback/service-proxy");
const path_1 = tslib_1.__importDefault(require("path"));
const sequence_1 = require("./sequence");
const jwt_authentication_component_1 = require("@loopback/authentication-jwt/dist/jwt-authentication-component");
const authentication_component_1 = require("@loopback/authentication/dist/authentication.component");
const authorization_component_1 = require("@loopback/authorization/dist/authorization-component");
const keys_1 = require("@loopback/authentication-jwt/dist/keys");
const datasources_1 = require("./datasources");
class EventApirestApplication extends boot_1.BootMixin(service_proxy_1.ServiceMixin(repository_1.RepositoryMixin(rest_1.RestApplication))) {
    constructor(options = {}) {
        super(options);
        // Set up the custom sequence
        this.sequence(sequence_1.MySequence);
        // Set up default home page
        this.static('/', path_1.default.join(__dirname, '../public'));
        // Customize @loopback/rest-explorer configuration here
        this.configure(rest_explorer_1.RestExplorerBindings.COMPONENT).to({
            path: '/explorer',
        });
        this.component(rest_explorer_1.RestExplorerComponent);
        this.component(authentication_component_1.AuthenticationComponent);
        this.component(jwt_authentication_component_1.JWTAuthenticationComponent);
        this.component(authorization_component_1.AuthorizationComponent);
        this.dataSource(datasources_1.MongoDataSource, keys_1.UserServiceBindings.DATASOURCE_NAME);
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
exports.EventApirestApplication = EventApirestApplication;
//# sourceMappingURL=application.js.map