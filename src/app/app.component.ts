import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { HeaderComponent } from './shared/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProductivityAPP-View';
  isSideBarCompacted = false;

  toggleSideBar() {
    this.isSideBarCompacted = !this.isSideBarCompacted;
  }
}
