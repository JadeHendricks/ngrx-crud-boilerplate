import { createFeatureSelector, createSelector } from "@ngrx/store";
import { employeeAdapter, EmployeeState } from "./employee.reducer";

 export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');
 
 const { selectAll, selectEntities, selectIds, selectTotal } = employeeAdapter.getSelectors(selectEmployeeState);

// After you called employeeAdapter.setAll(employees, state) your state looks like this: (Reducer after getEmployeesSuccess)
// {
//   ids: [101, 102, 103],
//   entities: {
//     101: { employeeId: 101, fullName: "Alice", ... },
//     102: { employeeId: 102, fullName: "Bob", ... },
//     103: { employeeId: 103, fullName: "Charlie", ... }
//   },
//   currentEmployee: null,
//   loading: false,
//   error: null
// }

// Returns the array of all employees (ordered by your sortComparer if you set one).
// (a: Employee, b: Employee) => a.fullName.localeCompare(b.fullName) in the reducer
// Use it when:
// You need to render a list (*ngFor in your template).
// You don’t care about direct ID lookups, you just want the array.
export const selectEmployees = selectAll;

// Returns a dictionary/map of employees by ID.
// Use it when:
// You want fast lookups: const employee = entities[102]; // instantly Bob
// You’re building a detail page and already know the id.
// You don’t want to iterate through arrays to find one employee.
export const selectEmployeeEntities = selectEntities;

// Returns the array of all employee IDs.
// Use it when:
// You just need the IDs (not the full objects).
// Useful if you want to fetch more data for a set of IDs.
export const selectEmployeeIds = selectIds;

// Returns the count of employees in the collection. store.select(selectEmployeeTotal)
// Use it when:
// You want to show “Total employees: X” in your UI.
// For pagination (knowing how many records you have).
export const selectEmployeeTotal = selectTotal;

//  export const selectEmployees = createSelector(
//     selectEmployeeState,
//     state => state.employees
//  );

 export const selectLoading = createSelector(
    selectEmployeeState,
    state => state.loading
 );

export const selectError = createSelector(
    selectEmployeeState,
    state => state.error 
);

export const selectCurrentEmployee = createSelector(
    selectEmployeeState,
    state => state.currentEmployee
 );


// select currentEmployee with Entity (involves state changes - but for reference)

// Reducer State:
// Your state only stores the list, not currentEmployee
// export interface EmployeeState extends EntityState<Employee> {
//   selectedEmployeeId: number | null; // just the ID
//   loading: boolean;
//   error: any;
// }

// Reducer:
// User clicks on an employee in a list
// on(EmployeeListActions.selectEmployee, (state, { employeeId }) => ({
//   ...state,
//   selectedEmployeeId: employeeId
// }));

// Selectors:
// export const selectSelectedEmployeeId = createSelector(
//   selectEmployeeState,
//   state => state.selectedEmployeeId
// );

// export const selectCurrentEmployeeWithEntity = createSelector(
//   selectEmployeeEntities,
//   selectSelectedEmployeeId,
//   (entities, selectedId) => selectedId ? entities[selectedId] : null
// );

// employee-detail.component.ts
// this.employee$ = this.store.select(selectCurrentEmployeeWithEntity);
// this.store.dispatch(EmployeeListActions.selectEmployee({ employeeId }));