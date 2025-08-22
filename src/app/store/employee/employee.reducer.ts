import { createReducer, on } from "@ngrx/store";
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Employee } from "../employee";
import { HttpErrorResponse } from "@angular/common/http";
import { EmployeeListActions } from "./employee.action";

export interface EmployeeState extends EntityState<Employee> {
    // employees: Employee[], now being held with Entity
    currentEmployee: Employee | null,
    loading: boolean,
    error: HttpErrorResponse | null
}

export const employeeAdapter = createEntityAdapter<Employee>({
    selectId: (employee: Employee) => employee.employeeId,
    sortComparer: (a: Employee, b: Employee) => a.fullName.localeCompare(b.fullName)
});

export const initialState: EmployeeState = employeeAdapter.getInitialState({
    // employees: [], now being held with Entity
    currentEmployee: null,
    loading: false,
    error: null
})

export const employeeReducer = createReducer(
    initialState,

    // Get Employees actions
    on(EmployeeListActions.getEmployees, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.getEmployeesSuccess, (state: EmployeeState, {employees}) =>
        employeeAdapter.setAll(employees, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(EmployeeListActions.getEmployeesError, (state: EmployeeState, {error}) =>({
        ...state,
        loading: false,
        error
    })),

    // Get Employees actions by Id
    on(EmployeeListActions.getEmployeeById, (state: EmployeeState) => ({
        ...state,
        currentEmployee: null,
        loading: true,
        error: null
    })),
    on(EmployeeListActions.getEmployeeByIdSuccess, (state: EmployeeState, {employee}) =>({
        ...state,
        currentEmployee: employee,
        loading: false,
        error: null
    })),
    on(EmployeeListActions.getEmployeeByIdError, (state, {error}) =>({
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
    on(EmployeeListActions.deleteEmployeeSuccess, (state, {employeeId}) => 
        employeeAdapter.removeOne(employeeId, {
            ...state,
            loading: false,
            error: null
        })
    ),
    on(EmployeeListActions.deleteEmployeeError, (state, {error}) => ({
        ...state,
        loading: false,
        error
    }))
)