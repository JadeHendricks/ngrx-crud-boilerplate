import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentEmployee, selectError, selectLoading } from '../../store/employee/employee.selector';
import { Employee } from '../../store/employee';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';
@Component({
  selector: 'app-employee',
  imports: [RouterLink, AsyncPipe, LoaderComponent, ErrorComponent],
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {

  private store = inject(Store);

  public readonly employeeId: InputSignal<number> = input.required<number>()
  public currentEmployee$: Observable<Employee | null> = this.store.select(selectCurrentEmployee);
  public error$: Observable<HttpErrorResponse | null> = this.store.select(selectError);
  public loading$: Observable<boolean> = this.store.select(selectLoading);  

  ngOnInit(): void {
    if (this.employeeId()) {
      this.store.dispatch({
        type: '[Employees List] GetEmployeeById',
        employeeId: this.employeeId()
      });
    }
  }
}
