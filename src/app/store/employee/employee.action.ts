import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";

export const EmployeeListActions = createActionGroup({
  source: 'Employees List',
  events: {
    'GetEmployees': emptyProps(),
    'GetEmployees Success': props<{ employees: Employee[] }>(),
    'GetEmployees Error': props<{ error: HttpErrorResponse }>(),
    // Adding Employee Actions
    'AddEmployee': props<{ employee: Employee }>(),
    'AddEmployee Success': props<{ employee: Employee }>(),
    'AddEmployee Error': props<{ error: HttpErrorResponse }>(),
    // Deleting Employee Actions
    'DeleteEmployee': props<{ employeeId: number }>(),
    'DeleteEmployee Success': props<{ employeeId: number }>(),
    'DeleteEmployee Error': props<{ error: HttpErrorResponse }>()
  },
});