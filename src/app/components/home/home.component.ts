import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { Employee } from '../../store/employee';
import { Store } from '@ngrx/store';
import { selectEmployees, selectError, selectLoading } from '../../store/department/employee.selector';
import { AsyncPipe, CommonModule } from '@angular/common';
import { loadEmployees } from '../../store/department/employee.action';
import { HttpErrorResponse } from '@angular/common/http';

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
  public loading$: Observable<boolean> = this.store.select(selectLoading);
  public error$: Observable<HttpErrorResponse | null> = this.store.select(selectError);

  ngOnInit(): void {
    this.store.dispatch(loadEmployees())
  }
}
