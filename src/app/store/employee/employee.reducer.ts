import { createReducer, on } from "@ngrx/store";
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";
import { EmployeeListActions } from "./employee.action";

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
    // Add Employee actions
    on(EmployeeListActions.addEmployee, state  => ({
        ...state,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.addEmployeeSuccess, (state, {employee}) => ({
        ...state,
        employees: [...state.employees, employee],
        loading: false,
        error: null
    })),
    on(EmployeeListActions.addEmployeeError, (state, {error}) => ({
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