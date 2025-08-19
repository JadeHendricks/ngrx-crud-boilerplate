import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { loadEmployee, loadEmployeeSuccess } from "./employee.action";
import { Employee } from "../employee";
import { EmployeeService } from "../../services/employee.service";

@Injectable()
export class EmployeeEffects {
    private actions$ = inject(Actions);
    private employeeService = inject(EmployeeService);

    loadEmployee$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadEmployee),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                    map((employees: any) => {
                        return loadEmployeeSuccess({employees});
                    })
                )
            )
        )
    );
}