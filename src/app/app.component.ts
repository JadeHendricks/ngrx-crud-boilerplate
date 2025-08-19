import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Employee } from './store/employee';
import { loadEmployee } from './store/department/employee.action';
import { selectEmployees } from './store/department/employee.selector';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, AsyncPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  public employees$: Observable<Employee[]>= this.store.select(selectEmployees);
  // public loading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.store.dispatch(loadEmployee())
  }
}
