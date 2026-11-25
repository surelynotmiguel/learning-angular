import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DropdownModule, SidebarModule } from '@coreui/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideRouter(routes),
    importProvidersFrom(SidebarModule, DropdownModule)
  ],
};
