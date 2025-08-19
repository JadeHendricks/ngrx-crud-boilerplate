import { Component, Input, signal } from '@angular/core';
import { Employee } from '../../store/employee';

@Component({
  selector: 'app-card',
  imports: [],
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() employee!: Employee;
}
