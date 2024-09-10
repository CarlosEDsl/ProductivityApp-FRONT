import { Component, EventEmitter, HostListener, OnDestroy, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { TokenServiceService } from '../services/token-service.service';
import { CommonModule } from '@angular/common';
import { UsersServiceService } from '../services/users-service.service';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsComponent } from '../settings/settings.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] // Correção de 'styleUrl' para 'styleUrls'
})
export class HeaderComponent implements OnDestroy {
  authService = inject(TokenServiceService);
  userService = inject(UsersServiceService);
  router = inject(Router);
  username!: Observable<String>;
  userId: string | null = this.authService.getId();

  public screenWidth: number = 0;
  private userSubscription: Subscription;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;  // Atualiza a largura quando a tela é redimensionada
  }


  @Output() toggleNav = new EventEmitter<void>();

  constructor(public settingsDialog: MatDialog) {
    this.userSubscription = this.userService.get(this.userId ?? '', this.authService.getToken() ?? '').pipe(
      catchError(error => {
        console.error('Erro ao buscar usuário:', error);
        this.authService.clearToken();
        return of(null);
      }),
      tap(user => {
        this.username = of(user!.name);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onToggleNav() {
    this.toggleNav.emit();
  }

  onLoggout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/');
  }

  onSettings(): void {
    this.settingsDialog.open(SettingsComponent, {
      width: '90%',
      height: '80%'
    });
  }
}
