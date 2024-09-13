import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthStatisticsService {

  private APIUrl = 'http://localhost:8080';
  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
  }


}
