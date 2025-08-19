import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { DepartmentService } from "../../services/department.service";
import { loadDepartment, loadDepartmentSuccess } from "./department.action";
import { map, mergeMap } from "rxjs";

@Injectable()
export class DepartmentEffects {
    private actions$ = inject(Actions);
    private departmentService = inject(DepartmentService);

    loadDepartments$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadDepartment),
            mergeMap(() =>
                this.departmentService.getDepartmnets().pipe(
                    map((departments: any) => {
                        return loadDepartmentSuccess({departments});
                    })
                )
            )
        )
    );
}