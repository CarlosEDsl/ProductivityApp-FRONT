import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormField, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  @ViewChild('loginForm') loginForm!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.loginForm) {
      setTimeout(() => {
        this.renderer.addClass(this.loginForm.nativeElement, 'show');
      }, 0);
    }
  }
}
