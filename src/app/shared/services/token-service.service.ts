import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenServiceService {

  private readonly tokenKey = 'Authentication';

  constructor() {}

  setToken(token:string | null) {
    if(token)
      localStorage.setItem(this.tokenKey, token);
    else
      this.clearToken();
  }

  getToken() {
    localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  isUserLogged(){
    if(this.getToken() != null) {
      return true;
    }
    return false;
  }
}
