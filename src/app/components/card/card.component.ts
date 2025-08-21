import { Component, inject, Input } from '@angular/core';
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
  @Input() employee!: Employee;
  private router = inject(Router);
  private store = inject(Store);

  public viewMore(employeeId: number): void {
    this.router.navigate(['/employee', employeeId]);
  }

  public deleteEmployee(employeeId: number): void {
    this.store.dispatch({
      type: '[Employees List] DeleteEmployee',  
      employeeId: employeeId
    });
  }
}
