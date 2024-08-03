import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private APIUrl = 'http://localhost:8080';
  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
  }

  getAllFromUser(userId:string, token:string): Observable<Task[]> {

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<Task[]>(`${this.APIUrl}/task/user/${userId}`, { headers });
  }

}
