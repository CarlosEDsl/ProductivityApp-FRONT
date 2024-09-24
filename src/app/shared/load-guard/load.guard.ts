import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingGuard implements CanActivate {

  constructor(private loadingService: LoadingService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        this.loadingService.hide();
      }
    });
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}
