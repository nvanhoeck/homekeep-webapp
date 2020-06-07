import {KeycloakConfig, KeycloakInitOptions, KeycloakOptions} from 'keycloak-angular';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

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
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
