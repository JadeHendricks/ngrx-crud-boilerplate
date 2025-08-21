import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EmployeeState } from "./employee.reducer";

 export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

 export const selectEmployees = createSelector(
    selectEmployeeState,
    state => state.employees
 );

 export const selectLoading = createSelector(
    selectEmployeeState,
    state => state.loading
 )

export const selectError = createSelector(
    selectEmployeeState,
    state => state.error
 )