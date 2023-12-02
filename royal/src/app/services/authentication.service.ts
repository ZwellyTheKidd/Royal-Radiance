import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError  } from 'rxjs';
import { LoginData } from '../interface/login'
import { LoginResponse } from '../interface/login-response';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserData } from '../interface/user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private appURL = 'http://localhost:5038/api/royalapp';

  constructor(private http:HttpClient,private router: Router) { }

  //user login method

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.appURL + '/login', data ,{withCredentials: true})
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
  
          let errorMessage = 'An error occurred';
  
          if (error.status === 404) {
            errorMessage = 'Invalid login Creditials,Try again';
          } else if (error.status === 401) {
            errorMessage = 'Invalid login Creditials,Try again';
          } else if (error.status === 500) {
            errorMessage = 'Internal Server Error';
          }
  
          return of({ success: false, message: errorMessage });
        })
      );
  }





  getUser(): Observable<UserData | null> {

    return this.http.get<any>(this.appURL+ '/user', {withCredentials: true})
    .pipe(
      map(response => response),

      catchError((error) => {

        console.error('Error fetching user data:', error);
        this.router.navigate(['/login']);
        return of(null);

      })
    );
  }

  displayName(): Observable<UserData | null> {

    return this.http.get<any>(this.appURL+ '/user', {withCredentials: true})
    .pipe(
      map(response => response),

      catchError((error) => {

        console.error('Error fetching user data:', error);

        return of(null);

      })
    );
  }
  

  



  
}
