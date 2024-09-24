import { UserLogin } from './../interfaces/user-login';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { HoursTime } from '../interfaces/hours-time';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { TokenServiceService } from './token-service.service';
import { MonthStatics } from '../interfaces/month-statistic';
import { AddHours } from '../interfaces/add-hours';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  tokenService = inject(TokenServiceService);

  private ApiURL = `/api`;

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

  patch(id: number, statsHour: AddHours, auth:string) {
    return this.httpClient.patch(`${this.ApiURL}/user/${id}`, statsHour, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      })
    });
  }

  getMonthS(userId: number, statsHour: HoursTime, auth: string) {
    const params = new HttpParams()
      .set('month', statsHour.month.toString())
      .set('year', statsHour.year.toString());

    return this.httpClient.get<MonthStatics>(`${this.ApiURL}/user/statistic/${userId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': auth
      }),
      params: params
    });
  }

  getCurrentMonth(userId: number, auth: string) {
    return this.httpClient.get<any>(`${this.ApiURL}/user/nowStatistic/${userId}`, {
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
