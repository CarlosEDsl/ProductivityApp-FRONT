import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private readonly tokenKey = 'Authentication';
  private readonly idKey = 'UserId';

  constructor() {}

  setToken(token:string | null, userId:string | null) {
    if(token && userId){
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.idKey, userId);
    }
    else
      this.clearToken();
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.idKey);
  }

  getId() {
    return localStorage.getItem(this.idKey);
  }

  isUserLogged(){
    if(this.getToken() != null) {
      return true;
    }
    return false;
  }
}
