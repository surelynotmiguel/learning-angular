import { Service, inject } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment.development';

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams | Record<string, string | number | boolean>;
  responseType?: 'json';
}

@Service()
export class HttpService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.apiUrl;

  // ============================
  // GET
  // ============================
  get<T>(
    endpoint: string,
    useProjectApi = true,
    options?: HttpOptions
  ): Observable<T> {
    return this.http
      .get<T>(this.buildUrl(endpoint, useProjectApi), options)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // POST
  // ============================
  post<T>(
    endpoint: string,
    body: unknown,
    useProjectApi = true,
    options?: HttpOptions
  ): Observable<T> {
    console.log(`${endpoint}`, body);
    return this.http
      .post<T>(this.buildUrl(endpoint, useProjectApi), body, options)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // PUT
  // ============================
  put<T>(
    endpoint: string,
    body: unknown,
    useProjectApi = true,
    options?: HttpOptions
  ): Observable<T> {
    return this.http
      .put<T>(this.buildUrl(endpoint, useProjectApi), body, options)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // PATCH
  // ============================
  patch<T>(
    endpoint: string,
    body: unknown,
    useProjectApi = true,
    options?: HttpOptions
  ): Observable<T> {
    return this.http
      .patch<T>(this.buildUrl(endpoint, useProjectApi), body, options)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // DELETE
  // ============================
  delete<T>(
    endpoint: string,
    useProjectApi = true,
    options?: HttpOptions
  ): Observable<T> {
    return this.http
      .delete<T>(this.buildUrl(endpoint, useProjectApi), options)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // UPLOAD (multipart/form-data)
  // ============================
  upload<T>(
    endpoint: string,
    file: File,
    useProjectApi = true,
    extraData?: Record<string, unknown>
  ): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);

    if (extraData) {
      Object.entries(extraData).forEach(([key, value]) =>
        formData.append(key, String(value))
      );
    }

    return this.http
      .post<T>(this.buildUrl(endpoint, useProjectApi), formData)
      .pipe(catchError(this.handleError));
  }

  // ============================
  // DOWNLOAD
  // ============================
  download(endpoint: string, useProjectApi = true): Observable<Blob> {
    return this.http
      .get(this.buildUrl(endpoint, useProjectApi), {
        responseType: 'blob',
      })
      .pipe(catchError(this.handleError));
  }

  // ============================
  // HELPERS
  // ============================
  private buildUrl(endpoint: string, useProjectApi: boolean): string {
    return useProjectApi
      ? `${this.baseUrl}/${endpoint.replace(/^\/+/, '').trim()}`
      : endpoint.trim();
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Erro inesperado';

    if (error.error?.message) {
      message = error.error.message;
    } else if (error.status === 0) {
      message = 'Erro de conexão com o servidor';
    }

    return throwError(() => ({
      status: error.status,
      message,
      error,
    }));
  }
}
