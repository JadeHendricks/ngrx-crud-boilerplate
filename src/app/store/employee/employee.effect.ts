import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, of } from "rxjs";
import { Employee } from "../employee";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeListActions } from "./employee.action";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";


@Injectable()
export class EmployeeEffects {
    private actions$ = inject(Actions);
    private employeeService = inject(EmployeeService);
    private toastr = inject(ToastrService);

    loadEmployee$ = createEffect(() => 
        this.actions$.pipe(
            ofType(EmployeeListActions.getEmployees),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                    delay(1500),
                    map((employees: Employee[]) => {
                        return EmployeeListActions.getEmployeesSuccess({employees});
                    }),
                    catchError((error: HttpErrorResponse) => {
                        return of(EmployeeListActions.getEmployeesError({error}));
                    })
                )
            )
        )
    );

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeListActions.deleteEmployee),
            mergeMap(({ employeeId }) =>
            this.employeeService.deleteEmployeeById(employeeId).pipe(
                map(() => {
                    this.toastr.success(`Employee with the id of: ${employeeId} was deleted successfully`, 'Success');
                    return EmployeeListActions.deleteEmployeeSuccess({ employeeId });
                }),
                catchError((error: HttpErrorResponse) =>
                of(EmployeeListActions.deleteEmployeeError({ error }))
                )
            )
            )
        )
    );

    getEmployeeById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(EmployeeListActions.getEmployeeById),
            mergeMap(({ employeeId }) =>
                this.employeeService.getEmployeeById(employeeId).pipe(
                    map((employee) => {
                        this.toastr.success(`Employee with the id of: ${employeeId} was retrived successfully`, 'Success');
                        return EmployeeListActions.getEmployeeByIdSuccess({ employee });
                    }),
                    catchError((error: HttpErrorResponse) =>
                        of(EmployeeListActions.getEmployeeByIdError({ error }))
                    )
                )
            )
        )
    );

}
