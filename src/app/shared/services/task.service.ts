import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private APIUrl = 'http://localhost:8080';
  private http:HttpClient;

  private tasksSource = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSource.asObservable();

  constructor(http:HttpClient) {
    this.http = http;
  }

  getAllFromUser(userId:string, token:string): Observable<Task[]> {

    const headers = new HttpHeaders({
      'Authorization': `${token}`
    });

    return this.http.get<Task[]>(`${this.APIUrl}/task/user/${userId}`, { headers });
  }

  create(task: Task, auth: string): Observable<Task> {

    const currentTasks = this.tasksSource.value;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${auth}`
    });
    return this.http.post<Task>(`${this.APIUrl}/task`, task, { headers: headers }).pipe(
      // Atualize o BehaviorSubject somente quando a tarefa for criada com sucesso
      tap(newTask => {
        const currentTasks = this.tasksSource.value;
        this.tasksSource.next([...currentTasks, newTask]);
      })
    );

  }

  loadTasks(userId: string, token: string) {
    this.getAllFromUser(userId, token).subscribe(tasks => {
      this.tasksSource.next(tasks);
    });
  }

}
