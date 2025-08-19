import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { Employee } from '../../store/employee';
import { Store } from '@ngrx/store';
import { selectEmployees } from '../../store/department/employee.selector';
import { loadEmployee } from '../../store/department/employee.action';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CardComponent, AsyncPipe, CommonModule],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private store = inject(Store);

  public employees$: Observable<Employee[]>= this.store.select(selectEmployees);
  // public loading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.store.dispatch(loadEmployee())
  }
}
