import { SnackBarType } from './../../../shared/snack-bar/snack-bar.service';
import { UserLogin } from './../../../shared/interfaces/user-login';
import { Component, ElementRef, ViewChild, Renderer2, Input, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UsersServiceService } from '../../../shared/services/users-service.service';
import { TokenServiceService } from '../../../shared/services/token-service.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/snack-bar/snack-bar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers:[UsersServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  @ViewChild('loginForm') loginForm!: ElementRef;
  form!: FormGroup;
  userService = inject(UsersServiceService);
  tokenService = inject(TokenServiceService);
  router = inject(Router);
  snackBar = inject(SnackbarService);
  @Input() user: UserLogin | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.loginForm) {
      setTimeout(() => {
        this.renderer.addClass(this.loginForm.nativeElement, 'show');
      }, 0);
    }
  }

  ngOnInit(){
    this.form = new FormGroup(
      {
        email: new FormControl(this.user?.email ?? '', {
          nonNullable: true,
          validators: [Validators.email, Validators.required]
        }),
        password: new FormControl(this.user?.password ?? '', {
          nonNullable: true,
          validators: Validators.required
        })
      }
    )
  }

  onSubmit() {
    if (this.form.valid) {
      const formValues = this.form.value;
      const user: UserLogin = {
        email: formValues.email,
        password: formValues.password
      };
      this.userService.login(user).subscribe({
        next: () => {
          this.snackBar.show("Logado com sucesso", 'success');
          this.router.navigateByUrl("/").catch(() => console.error("Erro na rota"));
        },
        error: () => {
          this.snackBar.show("Dados não encontrados.", 'error');
        }
      })
    }
  }

  //Hide password
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
