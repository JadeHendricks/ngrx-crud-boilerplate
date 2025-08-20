import { Component, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { Employee } from '../../store/employee';
import { Store } from '@ngrx/store';
import { selectEmployees, selectError, selectLoading } from '../../store/department/employee.selector';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployeeListActions } from '../../store/department/employee.action';
import { LoaderComponent } from '../loader/loader.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, AsyncPipe, CommonModule, LoaderComponent, ErrorComponent],
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
    this.store.dispatch(EmployeeListActions.getEmployees());
  }
}
