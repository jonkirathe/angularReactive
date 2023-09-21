import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApiService } from './services/api.service';

/***
 * This code exports an object named  appConfig  which is of type  ApplicationConfig . It contains a property named  providers  which is an array of providers. One provider is included in the array, which is  provideRouter(routes) .  
The purpose of this code is to configure the application by providing the necessary providers for routing. The  provideRouter(routes)  function is used to create a router provider with the specified routes. This configuration can be used in the application to enable routing functionality.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()), ApiService,
    importProvidersFrom() ]
};
