import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthStatisticsService {

  private APIUrl = 'https://productivityapp-api.onrender.com';
  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
  }


}
