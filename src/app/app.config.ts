import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { employeeReducer } from './store/department/employee.reducer';
import { EmployeeEffects } from './store/department/employee.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withComponentInputBinding()), 
    provideHttpClient(),
    provideStore({employees: employeeReducer}), 
    provideEffects([EmployeeEffects]), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
