import {KeycloakConfig, KeycloakInitOptions, KeycloakOptions} from 'keycloak-angular';

const keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8180/auth',
  realm: 'homekeep',
  clientId: 'homekeep-webapp',
  credentials: {
    secret: 'cf5e5c88-5073-4dfe-9a4b-dca150ae66be'
  }
};

const keycloakInitOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false
};

const keycloakOptions: KeycloakOptions = {
  config: keycloakConfig,
  initOptions: keycloakInitOptions,
  enableBearerInterceptor: true
};

export const environment = {
  production: true,
  loggingLevel: 0,
  // keycloak: {
  //   issuer: 'http://localhost:8180/auth',
  //   realm: 'homekeep',
  //   clientId: 'homekeep-webapp',
  //   credentials: {
  //     secret: 'cf5e5c88-5073-4dfe-9a4b-dca150ae66be'
  //   }
  // }
  keycloakOptions
};
