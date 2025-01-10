import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  canActivate(): boolean {
    // Verifica si el código se está ejecutando en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        // El usuario está autenticado
        return true;
      } else {
        // Si no está autenticado, redirige al login
        this.router.navigate(['/login']);
        return false;
      }
    }

    // Si no estamos en el navegador, deniega el acceso por seguridad
    return false;
  }
}