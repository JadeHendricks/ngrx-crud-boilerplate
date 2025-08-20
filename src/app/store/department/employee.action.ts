import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";

export const EmployeeListActions = createActionGroup({
  source: 'Employees List',
  events: {
    'GetEmployees': emptyProps(),
    'GetEmployees Success': props<{ employees: Employee[] }>(),
    'GetEmployees Error': props<{ error: HttpErrorResponse }>(),
  },
});