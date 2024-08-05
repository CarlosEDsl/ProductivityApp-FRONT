import { UserLogin } from './../interfaces/user-login';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { HoursTime } from '../interfaces/hours-time';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  tokenService = inject(TokenServiceService);

  private ApiURL = 'http://localhost:8080';

  private httpClient = inject(HttpClient);

  get(id: string, auth:string) {
    return this.httpClient.get<User>(`${this.ApiURL}/user/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })
    });
  }

  post(user: User) {
    return this.httpClient.post<User>(`${this.ApiURL}/user`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });

  }

  put(user: User) {
    return this.httpClient.put<User>(`${this.ApiURL}/user/${user.id}`, user);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.ApiURL}/user/${id}`);
  }

  patch(id: number, statsHour: HoursTime) {
    return this.httpClient.patch<HoursTime>(`${this.ApiURL}/user/${id}`, statsHour);
  }

  getMonthS(id: number, statsHour: HoursTime, auth: string) {
    return this.httpClient.request<HoursTime>('GET', `${this.ApiURL}/statistic/${id}`, {
      body: statsHour,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })
    });
  }

  login(credentials: UserLogin): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(`${this.ApiURL}/login`, credentials, { observe: 'response' }).pipe(
      tap((response: HttpResponse<void>) => {
        const authorization = response.headers.get('Authorization');
        const userId = response.headers.get('UserId');

        if (authorization) {
          this.tokenService.setToken(authorization, userId);
        } else {
          console.error('Authorization header is missing.');
        }
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(error);
      })
    );
  }
}
