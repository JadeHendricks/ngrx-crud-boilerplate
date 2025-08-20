import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee/:employeeId',
    component: EmployeeComponent,
    pathMatch: 'full',
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    pathMatch: 'full',
  },
];
