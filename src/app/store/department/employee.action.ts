import { createAction, props } from "@ngrx/store";
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";

export const loadEmployees = createAction('[Employee] Load Employees');

export const loadEmployeesSuccess = createAction(
    '[Employee] Load Employees Success',
    props<{employees: Employee[]}>()
)

export const loadEmployeesError = createAction(
    '[Employee] Load Employees Error',
    props<{error: HttpErrorResponse}>()
)
