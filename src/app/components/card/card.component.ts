import { Component, inject, input, InputSignal } from '@angular/core';
import { Employee } from '../../store/employee';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-card',
  imports: [],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  private router = inject(Router);
  private store = inject(Store);

  public readonly employee: InputSignal<Employee> = input.required<Employee>()

  public viewMore(employeeId: number): void {
    this.router.navigate(['/employee', employeeId]);
  }

  public deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.store.dispatch({
        type: '[Employees List] DeleteEmployee',  
        employeeId: employeeId
      });
    }
  }
}
