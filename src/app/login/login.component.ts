import { Component } from '@angular/core';
import { ReviewsServiceService } from '../services/reviews-service.service';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: ReviewsServiceService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    console.log('Formulario válido:', this.loginForm.valid);
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authService.login(username, password).subscribe({
        next: (response: any) => {
          console.log('Login exitoso:', response);

          // Guarda el estado del usuario o el token
          localStorage.setItem('currentUser', JSON.stringify(response));

          // Redirige al usuario
          this.router.navigate(['/Dashboard']).then(() => {
            console.log('Redirigido a Dashboard');
          });

        },
        error: (err) => {
          console.error('Error durante el inicio de sesión:', err);
          this.errorMessage = 'Credenciales inválidas';
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  onLogout(): void {
    // Elimina los datos del usuario almacenados en el localStorage
    localStorage.removeItem('currentUser');

    // Opcionalmente, elimina cualquier otra información relacionada con la sesión

    // Redirige al usuario a la página de inicio de sesión o la página pública que prefieras
    this.router.navigate(['/login']).then(() => {
      console.log('Redirigido a la página de login');
    });
  }



}
