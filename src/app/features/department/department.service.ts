import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { Department } from '../../models/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private readonly baseUrl = `${environment.apiBaseUrl}/departments`;

  constructor(private apiService: ApiService) {}

  getAllDepartments(): Observable<Department[]> {
    return this.apiService.get<Department[]>(this.baseUrl);
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.apiService.get<Department>(`${this.baseUrl}/${id}`);
  }

  createDepartment(department: Partial<Department>): Observable<Department> {
    return this.apiService.post<Department>(this.baseUrl, department);
  }

  updateDepartment(id: string, department: Partial<Department>): Observable<Department> {
    return this.apiService.put<Department>(`${this.baseUrl}/${id}`, department);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
