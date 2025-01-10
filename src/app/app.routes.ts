import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreditosComponent } from './creditos/creditos.component';
import { NuevaReviewComponent } from './nueva-review/nueva-review.component';
import { EditarReviewComponent } from './editar-review/editar-review.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'Reviews', component: ReviewsListComponent, canActivate: [AuthGuard] }, // Ruta protegida
    { path: 'Dashboard', component: DashboardComponent },
    { path: 'Creditos', component: CreditosComponent },
    { path: 'NuevaReview', component: NuevaReviewComponent },
    { path: 'EditarReview', component: EditarReviewComponent },
    { path: '**', redirectTo: 'login' }
];
