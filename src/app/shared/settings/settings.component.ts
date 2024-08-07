import { User } from './../interfaces/user';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { TokenServiceService } from '../services/token-service.service';
import { UsersServiceService } from '../services/users-service.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  settingsDialog = inject(MatDialog);
  authService = inject(TokenServiceService);
  userService = inject(UsersServiceService);
  user!:User;

  userCall = this.userService.get(this.authService.getId() ?? '', this.authService.getToken() ?? '').subscribe((user => {
    this.user = user;
  }));

  openConfig() {
    this.settingsDialog.open(SettingsComponent);
  }

}
