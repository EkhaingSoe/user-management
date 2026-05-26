import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../environment/environment';
// Verify path fits your directory tree

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly DEFAULT_TIMEOUT = 30000;
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
  }

  /**
   * Automatically combines base context paths with endpoints
   * while allowing absolute network URLs to pass through safely.
   */
  private createFullUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Ensures clean concatenations regardless of leading slash rules
    const formattedUrl = url.startsWith('/') ? url : `/${url}`;
    return `${this.baseUrl}${formattedUrl}`;
  }

  get<T>(url: string, params?: any): Observable<T> {
    const httpParams = this.buildParams(params);
    const fullUrl = this.createFullUrl(url);

    return this.http
      .get<T>(fullUrl, {
        headers: this.getHeaders(),
        params: httpParams,
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  post<T>(url: string, body: any): Observable<T> {
    const fullUrl = this.createFullUrl(url);

    return this.http
      .post<T>(fullUrl, body, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  put<T>(url: string, body: any): Observable<T> {
    const fullUrl = this.createFullUrl(url);

    return this.http
      .put<T>(fullUrl, body, {
        headers: this.getHeaders(),
      })
      .pipe(timeout(this.DEFAULT_TIMEOUT), catchError(this.handleError));
  }

  delete<T>(url: string): Observable<T> {
    const fullUrl = this.createFullUrl(url);

    return this.http
      .delete<T>(fullUrl, {
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
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
