import { createReducer, on } from "@ngrx/store";
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";
import { EmployeeListActions } from "./employee.action";

export interface EmployeeState {
    employees: Employee[],
    currentEmployee: Employee | null,
    loading: boolean,
    error: HttpErrorResponse | null
}

export const initalState: EmployeeState = {
    employees: [],
    currentEmployee: null,
    loading: false,
    error: null
}

export const employeeReducer = createReducer(
    initalState,
    on(EmployeeListActions.getEmployees, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.getEmployeesSuccess, (state, {employees}) =>({
        ...state,
        employees,
        loading: false,
        error: null
    })),
    on(EmployeeListActions.getEmployeesError, (state, {error}) =>({
        ...state,
        loading: false,
        error
    })),
        on(EmployeeListActions.getEmployeeById, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.getEmployeeByIdSuccess, (state, {employee}) =>({
        ...state,
        currentEmployee: employee,
        loading: false,
        error: null
    })),
    on(EmployeeListActions.getEmployeesError, (state, {error}) =>({
        ...state,
        loading: false,
        error
    })),
    // Delete Employee actions
    on(EmployeeListActions.deleteEmployee, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.deleteEmployeeSuccess, (state, {employeeId}) => ({
        ...state,
        employees: state.employees.filter(employee => employee.employeeId !== employeeId),
        loading: false,
        error: null
    })),
    on(EmployeeListActions.deleteEmployeeError, (state, {error}) => ({
        ...state,
        loading: false,
        error
    }))
)