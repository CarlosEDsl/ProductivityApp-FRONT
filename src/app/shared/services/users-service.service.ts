import { HoursTime } from '../interfaces/hours-time';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private ApiURL = 'http://localhost:8080';
  users: User[] = [];
  statsHour: HoursTime[] = []

  httpClient = inject(HttpClient);

  get(id:string) {
    return this.httpClient.get<User>(`${this.ApiURL}/user/${id}`);
  }

  post(user:User) {
    return this.httpClient.post(`${this.ApiURL}/user`, user);
  }

  put(user:User) {
    return this.httpClient.put(`${this.ApiURL}/user/${user.id}`, user);
  }

  delete(id:number, email:any) {
    return this.httpClient.delete(`${this.ApiURL}/user/${id}`, email);
  }

  patch(id:number, statsHour:HoursTime) {
    return this.httpClient.patch(`${this.ApiURL}/user/${id}`, statsHour);
  }

  getMonthS(id:number, statsHour:HoursTime, auth:string) {
    return this.httpClient.request<HoursTime>('GET', `${this.ApiURL}/statistic/${id}`, {
      body: statsHour,
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authentication': auth
      })
    });
  }

}
