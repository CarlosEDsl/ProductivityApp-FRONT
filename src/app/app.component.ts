import { LoadingService } from './shared/services/loading.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { CanActivate, Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from './shared/warning-dialog/warning-dialog.component';
import { TokenServiceService } from './shared/services/token-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent, CommonModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, CanActivate{
  title = 'ProductivityAPP-View';
  isSideBarCompacted = false;
  timeoutId:any;

  sideBarOFF = {
    'display': 'none'
  };

  toggleSideBar() {
    this.isSideBarCompacted = !this.isSideBarCompacted;
    this.onSideBarClose(this.isSideBarCompacted);
  }
  onSideBarClose(isOpen: boolean) {
    this.isSideBarCompacted = isOpen;

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (!isOpen) {
      this.timeoutId = setTimeout(() => {
        this.sideBarOFF = {
          'display': 'none'
        };
      }, 300);
    } else {
      this.sideBarOFF = {
        'display': 'block'
      };
    }
  }

  constructor(private warningDialog:MatDialog, private authService:TokenServiceService, private router: Router, private loadingService: LoadingService) {}

  ngOnInit() {
    if(this.authService.getId() == null)
      this.warningDialog.open(WarningDialogComponent)
  }

  canActivate(): boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  isLoading = this.loadingService.loading$;


}

