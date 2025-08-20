import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, mergeMap, of } from "rxjs";
import { Employee } from "../employee";
import { EmployeeService } from "../../services/employee.service";
import { EmployeeListActions } from "./employee.action";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class EmployeeEffects {
    private actions$ = inject(Actions);
    private employeeService = inject(EmployeeService);

    loadEmployee$ = createEffect(() => 
        this.actions$.pipe(
            ofType(EmployeeListActions.getEmployees),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                    delay(3000),
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
}