import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TokenServiceService } from '../services/token-service.service';
import { CommonModule } from '@angular/common';
import { UsersServiceService } from '../services/users-service.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authService = inject(TokenServiceService);
  userService = inject(UsersServiceService);
  router = inject(Router);
  username = 'error';

  userId = this.authService.getId();
  user = this.userService.get(this.userId ?? '', this.authService.getToken() ?? '').subscribe((user) => {
    this.username = user.name;
  });

  @Output() toggleNav = new EventEmitter<void>();

  onToggleNav() {
    this.toggleNav.emit();
  }

  onLoggout() {
    this.authService.clearToken();
    this.router.navigateByUrl("/");
  }

}
