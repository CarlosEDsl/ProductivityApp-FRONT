import { UserLogin } from './../interfaces/user-login';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { HoursTime } from '../interfaces/hours-time';
import { BehaviorSubject } from 'rxjs';
import { TokenServiceService } from './token-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  tokenService = inject(TokenServiceService);

  private ApiURL = 'http://localhost:8080';

  private httpClient = inject(HttpClient);
  private authToken = new BehaviorSubject<string | null>(null);

  get(id: string) {
    return this.httpClient.get<User>(`${this.ApiURL}/user/${id}`);
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

  //Fazer tratamento pra login errado

  login(credentials: UserLogin) {
    this.httpClient.post<any>(`${this.ApiURL}/login`, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      observe: 'response'
    }).subscribe((response: HttpResponse<any>) => {
      const authToken = response.headers.get('Authorization');
      this.authToken.next(authToken);
      this.tokenService.setToken(this.authToken.getValue());

    }, error => {
      console.error('Login failed:', error);
      this.authToken.next(null);
      this.tokenService.setToken(null);
    });
  }
}
