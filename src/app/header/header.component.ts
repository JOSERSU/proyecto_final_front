import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  currentUser: any;
  static currentUser: any;

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

  ngOnInit() {
    // Obtén el usuario del localStorage
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user); // Convierte el string a un objeto
    }
  }

  actualizarVariable(): string {
    return this.currentUser.username;
  }

}
