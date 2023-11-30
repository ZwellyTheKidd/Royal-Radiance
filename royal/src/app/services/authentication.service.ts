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
    return this.http.post<LoginResponse>(this.appURL + '/login', data)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error:', error);
  
          let errorMessage = 'An error occurred';
  
          if (error.status === 404) {
            errorMessage = 'Incorrect Email, Please enter correct email';
          } else if (error.status === 401) {
            errorMessage = 'Invalid Password';
          } else if (error.status === 500) {
            errorMessage = 'Internal Server Error';
          }
  
          return of({ success: false, message: errorMessage });
        })
      );
  }



  // check if user is logged in
  checkUser(): Observable<UserData | null> {
    const jwtCookie = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*=\s*([^;]*).*$)|^.*$/, '$1');
  
    if (!jwtCookie) {
      this.router.navigate(['user/login']);
      return of(null);
    }
  
    return this.http.get<{ success: boolean, user: UserData }>(`${this.appURL}/user`).pipe(
      map(response => response.success ? response.user : null),
      catchError((error) => {
        this.router.navigate(['/user/login']);
        return of(null);
      })
    );
  }



  getUser(): Observable<UserData | null> {
    return this.http.get<{ success: boolean, user: UserData }>(`${this.appURL}/user`).pipe(
      map(response => response.success ? response.user : null),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        this.router.navigate(['/user/login']);
        return of(null);
      })
    );
  }
  

  



  
}
