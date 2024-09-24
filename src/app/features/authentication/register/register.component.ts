import { UserLogin } from './../../../shared/interfaces/user-login';
import { User } from './../../../shared/interfaces/user';
import { Component, ElementRef, inject, Renderer2, ViewChild, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersServiceService } from '../../../shared/services/users-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SnackbarService } from '../../../shared/snack-bar/snack-bar.service';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LoadingService } from '../../../shared/services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, NgxMaskDirective],
  providers: [provideNgxMask({ /* opções de cfg */ })],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('loginForm') loginForm!: ElementRef;
  userService = inject(UsersServiceService);
  snackbarService = inject(SnackbarService);
  router = inject(Router);
  @Input() user: User | null = null;
  form!: FormGroup;

  constructor(private renderer: Renderer2, private loadingService:LoadingService) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.user?.name ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      cell: new FormControl<string>(this.user?.cell ?? '', {
        nonNullable: false
      }),
      email: new FormControl<string>(this.user?.email ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      confirmEmail: new FormControl<string>(this.user?.email ?? '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl<string>(this.user?.password ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      confirmPassword: new FormControl<string>(this.user?.password ?? '', {
        nonNullable: true,
        validators: Validators.required
      })
    });
  }

  ngAfterViewInit(): void {
    if (this.loginForm) {
      setTimeout(() => {
        this.renderer.addClass(this.loginForm.nativeElement, 'show');
      }, 0);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      let userFormRes = this.form.value;

      if(userFormRes.email != userFormRes.confirmEmail){
        this.snackbarService.show("Error registering user email dont match", 'error');
      }
      else if(userFormRes.password != userFormRes.confirmPassword){
        this.snackbarService.show("Error registering user password dont match", 'error');
      }
      else {
        const user:User = {
          id: 0,
          name: userFormRes.name,
          email: userFormRes.email,
          password: userFormRes.password,
          cell: userFormRes.cell
        }

        this.loadingService.show();
        this.userService.post(user).subscribe({
          next: () => {
            this.loadingService.hide();
            this.snackbarService.show("User created", 'success');
            const login:UserLogin = {
              email: user?.email || '',
              password: user?.password || ''
            }
            this.userService.login(login).subscribe();
            this.router.navigateByUrl("/").catch(() => console.error("Route error"));
          },
          error: (error) => {
            if(error.status == 409){
              this.loadingService.hide();
              this.snackbarService.show("Email already in use", 'error');
            }
            else{
              this.loadingService.hide();
              this.snackbarService.show("Server error", 'error');
            }
          }
        });
      }
    }
  }

  //Hide password
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
