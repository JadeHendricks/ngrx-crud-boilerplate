import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { loadEmployees, loadEmployeesSuccess } from "./employee.action";
import { Employee } from "../employee";
import { EmployeeService } from "../../services/employee.service";

@Injectable()
export class EmployeeEffects {
    private actions$ = inject(Actions);
    private employeeService = inject(EmployeeService);

    loadEmployee$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadEmployees),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                    map((employees: Employee[]) => {
                        return loadEmployeesSuccess({employees});
                    })
                )
            )
        )
    );
}