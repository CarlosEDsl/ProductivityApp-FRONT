import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenServiceService } from '../services/token-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokenService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
