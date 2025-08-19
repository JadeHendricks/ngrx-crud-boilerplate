import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadDepartment } from './store/department/department.action';
import { Department } from './store/department';
import { selectDepartments, selectLoading } from './store/department/department.selector';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, AsyncPipe],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  public departments$: Observable<Department[]>= this.store.select(selectDepartments);
  public loading$: Observable<boolean> = this.store.select(selectLoading);

  ngOnInit(): void {
    this.store.dispatch(loadDepartment())
  }
}
