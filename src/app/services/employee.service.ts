import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl: string = "https://api.freeprojectapi.com/api"
  private http = inject(HttpClient);

  public getEmployees(): Observable<Object> {
      return this.http.get(`${this.baseUrl}/EmployeeApp/GetEmployees`);
  }
}
