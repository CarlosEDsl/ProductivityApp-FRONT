import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './shared/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent, CommonModule, LoadingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
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
}

