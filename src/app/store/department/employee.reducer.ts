import { createReducer, on } from "@ngrx/store";
import { Employee } from "../employee";
import { loadEmployees, loadEmployeesError, loadEmployeesSuccess } from "./employee.action";
import { HttpErrorResponse } from "@angular/common/http";

export interface EmployeeState {
    employees: Employee[],
    loading: boolean,
    error: HttpErrorResponse | null
}

export const initalState: EmployeeState = {
    employees: [],
    loading: false,
    error: null
}

export const employeeReducer = createReducer(
    initalState,
    on(loadEmployees, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadEmployeesSuccess, (state, {employees}) =>({
        ...state,
        employees,
        loading: false,
        error: null
    })),
    on(loadEmployeesError, (state, {error}) =>({
        ...state,
        loading: false,
        error: error
    }))
)