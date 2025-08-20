import { ChangeDetectionStrategy, Component, inject, input, Input, InputSignal, OnInit, signal } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../store/employee';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-employee',
  imports: [RouterLink, AsyncPipe],
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeComponent implements OnInit {

  public readonly employeeId: InputSignal<number> = input.required<number>()
  private employeeService: EmployeeService = inject(EmployeeService);

  public employee$: Observable<Employee> | null = null;


  ngOnInit(): void {
    this.employee$ = this.employeeService.getEmployeeById(this.employeeId());
  }
}
