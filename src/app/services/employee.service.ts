import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../store/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://api.freeprojectapi.com/api"
  private http = inject(HttpClient);

  public getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(`${this.baseUrl}/EmployeeApp/GetEmployees`);
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
      return this.http.get<Employee>(`${this.baseUrl}/EmployeeApp/${employeeId}`);
  }
}
