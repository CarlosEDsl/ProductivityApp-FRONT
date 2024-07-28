import { User } from './../../../shared/interfaces/user';
import { Component, ElementRef, inject, Renderer2, ViewChild, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UsersServiceService } from '../../../shared/services/users-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('loginForm') loginForm!: ElementRef;
  userService = inject(UsersServiceService);
  @Input() user: User | null = null;
  form!: FormGroup;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.user?.name ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      cell: new FormControl<string>(this.user?.cell ?? '', {
        nonNullable: false,
        validators: Validators.required
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
        console.error('Error registering user email dont match');
      }
      else if(userFormRes.password != userFormRes.confirmPassword){
        console.error('Error registering user password dont match');
      }
      else {
        const user:User = {
          id: 0,
          name: userFormRes.name,
          email: userFormRes.email,
          password: userFormRes.password,
          cell: userFormRes.cell
        }

        this.userService.post(user).subscribe(
          response => {
            console.log('User registered successfully', response);
          },
          error => {
            console.error('Error registering user', error);
          }
        );
      }
    }
  }
}
