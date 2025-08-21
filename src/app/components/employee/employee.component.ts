import { ChangeDetectionStrategy, Component, inject, input, Input, InputSignal, OnInit, signal } from '@angular/core';
import { Employee } from '../../store/employee';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentEmployee } from '../../store/employee/employee.selector';
@Component({
  selector: 'app-employee',
  imports: [RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {

  private store = inject(Store);

  public readonly employeeId: InputSignal<number> = input.required<number>()
  public currentEmployee$: Observable<any> = this.store.select(selectCurrentEmployee);

  ngOnInit(): void {
    if (this.employeeId()) {
      this.store.dispatch({
        type: '[Employees List] GetEmployeeById',
        employeeId: this.employeeId()
      });
    }
  }
}
