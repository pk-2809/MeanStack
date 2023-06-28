import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import { Observable, catchError, throwError } from 'rxjs';

export enum Method{
  GET, POST, PUT, DELETE, OPTIONS
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  callService<T>(endPoint: string, method: string,req?:any): Observable<T> {
    const url = `${environment.baseUrl}${endPoint}`;
    const httpOptions = {};
    switch (method.toUpperCase()) {
      case 'GET':
        return this.http.get<T>(url, httpOptions).pipe(
          catchError(this.handleErrors)
        );
      case 'POST':
        return this.http.post<T>(url, req).pipe(
          catchError(this.handleErrors)
        );
      default:
        const errorMessage = `Unsupported HTTP method: ${method}`;
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
  }

  deleteService(endPoint: string, req: string)
  {
    const url = `${environment.baseUrl}${endPoint}/`;
    return this.http.delete(url + req);
  }

  private handleErrors(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
