import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isLoginMode = true;
  email = '';
  password = '';
  name = '';
  phone = '';
  errorMessage = '';
  returnUrl = '/';

  constructor() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.isLoginMode) {
      this.authService.login(this.email, this.password).subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: () => {
          this.errorMessage = 'Invalid email or password. Try: customer@example.com or admin@example.com';
        }
      });
    } else {
      this.authService.register(this.name, this.email, this.phone, this.password).subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: () => {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    }
  }
}
