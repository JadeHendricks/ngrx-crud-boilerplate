import { createAction, props } from "@ngrx/store";
import { Employee } from "../employee";

export const loadEmployee = createAction('[Employee] Load Employee');

export const loadEmployeeSuccess = createAction(
    '[Employee] Load Employee Success',
    props<{employees: Employee[]}>()
)
