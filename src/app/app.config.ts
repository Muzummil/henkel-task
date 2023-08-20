// External Dependencies
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { provideHttpClient } from "@angular/common/http";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
// Internal Dependencies
import { routes } from "./app.routes";
import { ApiService } from "./shared/data-access/api-service/api.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    {
      provide: ApiService,
      useClass: ApiService,
    },
    importProvidersFrom(StoreModule.forRoot({}, {}), EffectsModule.forRoot([])),
  ],
};
