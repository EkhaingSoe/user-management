// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ApiService } from '../../services/api.service';
import { ApiResponse, User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = `${environment.apiBaseUrl}/users`;

  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<User[]> {
    return this.apiService.get<User[]>(this.baseUrl);
  }

  getUserById(id: string): Observable<User> {
    return this.apiService.get<User>(`${this.baseUrl}/${id}`);
  }

  createUser(user: Partial<User>): Observable<User> {
    return this.apiService.post<User>(this.baseUrl, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.apiService.put<User>(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.apiService.delete<any>(`${this.baseUrl}/${id}`);
  }
}
