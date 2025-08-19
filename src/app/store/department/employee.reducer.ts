import { createReducer, on } from "@ngrx/store";
import { Employee } from "../employee";
import { loadEmployee, loadEmployeeSuccess } from "./employee.action";

export interface EmployeeState {
    employees: Employee[],
    // loading: boolean
}

export const initalState: EmployeeState = {
    employees: [],
    // loading: false
}

export const employeeReducer = createReducer(
    initalState,
    on(loadEmployee, state => ({
        ...state,
        // loading: true
    })),
    on(loadEmployeeSuccess, (state, {employees}) =>({
        ...state,
        employees,
        // loading: false
    }))
)