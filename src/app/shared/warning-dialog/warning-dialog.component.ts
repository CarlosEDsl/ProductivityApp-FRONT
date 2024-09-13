import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UsersServiceService } from '../services/users-service.service';
import { UserLogin } from '../interfaces/user-login';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './warning-dialog.component.html',
  styleUrl: './warning-dialog.component.scss'
})
export class WarningDialogComponent {

  constructor(private userService:UsersServiceService) {}
  loginAsRecruiter() {
    const credentials: UserLogin = {email: "recrutadorfoda@gmail.com", password:"senhadorecrutador"}
    this.userService.login(credentials).subscribe();
  }
}
