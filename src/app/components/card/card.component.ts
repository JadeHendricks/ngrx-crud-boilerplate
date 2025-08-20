import { Component, inject, Input } from '@angular/core';
import { Employee } from '../../store/employee';
import { Router } from '@angular/router';

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

  public viewMore(employeeId: number): void {
    console.log(employeeId);
    this.router.navigate(['/employee', employeeId]);
  }

  public deleteEmployee(employeeId: number): void {
    console.log(`Delete employee with ID: ${employeeId}`);
  }
}
