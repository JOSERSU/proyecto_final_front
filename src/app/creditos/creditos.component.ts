import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditos',
  imports: [HeaderComponent],
  templateUrl: './creditos.component.html',
  styleUrl: './creditos.component.css'
})
export class CreditosComponent {

  constructor(private router: Router) { }

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
