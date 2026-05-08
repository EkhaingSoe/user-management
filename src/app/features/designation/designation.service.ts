import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { Designation } from '../../models/designation';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {

  private readonly baseUrl = `${environment.apiBaseUrl}/designations`;
  
    constructor(private apiService: ApiService) {}
  
    getAllDesignations(): Observable<Designation[]> {
      return this.apiService.get<Designation[]>(this.baseUrl);
    }
  
    getDesignationById(id: string): Observable<Designation> {
      return this.apiService.get<Designation>(`${this.baseUrl}/${id}`);
    }
  
    createDesignation(designation: Partial<Designation>): Observable<Designation> {
      return this.apiService.post<Designation>(this.baseUrl, designation);
    }
  
    updateDesignation(id: string, designation: Partial<Designation>): Observable<Designation> {
      return this.apiService.put<Designation>(`${this.baseUrl}/${id}`, designation);
    }
  
    deleteDesignation(id: string): Observable<any> {
      return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
    }
}
