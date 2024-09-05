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
      tap(newTask => {
        const currentTasks = this.tasksSource.value;
        this.tasksSource.next([...currentTasks, newTask]);
      })
    );
  }

  delete(taskId:number, auth: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${auth}`
    });

    return this.http.delete(`${this.APIUrl}/task/${taskId}`, { headers: headers })
    .pipe( tap(() => {
        const updatedTasks = this.tasksSource.value.filter(task => task.id !== taskId);
        this.tasksSource.next(updatedTasks);
    }))
  }

  edit(task:Task, auth: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `${auth}`
    });

    return this.http.put<Task>(`${this.APIUrl}/task/${task.id}`, task, { headers: headers })
    .pipe( tap((updatedTask) => {
        const currentTasks = this.tasksSource.value;
        const index = currentTasks.findIndex(t => t.id === updatedTask.id);

        if (index !== -1) {
          currentTasks[index] = updatedTask;
          this.tasksSource.next([...currentTasks]); // Emit the updated list
        }
    }))
  };

  loadTasks(userId: string, token: string) {
    this.getAllFromUser(userId, token).subscribe(tasks => {
      this.tasksSource.next(tasks);
    });
  }

}
