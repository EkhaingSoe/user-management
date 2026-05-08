import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { Company } from '../../models/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private readonly baseUrl = `${environment.apiBaseUrl}/companies`;

  constructor(private apiService: ApiService) {}

  getAllCompanies(): Observable<Company[]> {
    return this.apiService.get<Company[]>(this.baseUrl);
  }

  getCompanyById(id: string): Observable<Company> {
    return this.apiService.get<Company>(`${this.baseUrl}/${id}`);
  }

  createCompany(company: Partial<Company>): Observable<Company> {
    return this.apiService.post<Company>(this.baseUrl, company);
  }

  updateCompany(id: string, company: Partial<Company>): Observable<Company> {
    return this.apiService.put<Company>(`${this.baseUrl}/${id}`, company);
  }

  deleteCompany(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
