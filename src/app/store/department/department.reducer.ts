import { createReducer, on } from "@ngrx/store";
import { Department } from "../department";
import { loadDepartment, loadDepartmentSuccess } from "./department.action";

export interface DepartmentState {
    departments: Department[],
    loading: boolean
}

export const initalState: DepartmentState = {
    departments: [],
    loading: false
}

export const departmentReducer = createReducer(
    initalState,
    on(loadDepartment, state => ({
        ...state,
        loading: true
    })),
    on(loadDepartmentSuccess, (state, {departments}) =>({
        ...state,
        departments,
        loading: false
    }))
)