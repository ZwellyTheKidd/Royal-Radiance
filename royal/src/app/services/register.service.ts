import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { Register } from '../interface/register';

import { LoginResponse } from '../interface/login-response';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private appURL = 'https://royal-radiance.onrender.com/api/royalapp';

  constructor(private http: HttpClient) { }


  register(data:Register):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.appURL + '/register', data)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error:', error);

        let errorMessage = 'An error occurred';
        // return throwError({ success: false, message: errorMessage });
        return of({ success: false, message: errorMessage });
      })
    );
  }




}
