// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly DEFAULT_TIMEOUT = 30000;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  get<T>(url: string, params?: any): Observable<T> {
    const httpParams = this.buildParams(params);
    return this.http
      .get<T>(url, {
        headers: this.getHeaders(),
        params: httpParams,
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<T>(url, body, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http
      .put<T>(url, body, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    return this.http
      .delete<T>(url, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  private buildParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    return httpParams;
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
