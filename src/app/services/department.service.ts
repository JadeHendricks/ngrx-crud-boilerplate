import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private http = inject(HttpClient);

  public getDepartmnets(): Observable<Object> {
      return this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments');
  }
}
