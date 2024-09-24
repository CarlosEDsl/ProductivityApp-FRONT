import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MonthStatisticsService {

  private APIUrl = '/api/* http://ec2-54-233-168-110.sa-east-1.compute.amazonaws.com:8080';
  private http:HttpClient;

  constructor(http:HttpClient) {
    this.http = http;
  }


}
