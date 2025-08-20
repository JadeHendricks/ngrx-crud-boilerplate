import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-employee',
  imports: [],
  standalone: true,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent {
  @Input() employeeId!: number;
}
