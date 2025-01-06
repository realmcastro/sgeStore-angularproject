import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuard } from './services/auth.guard';
import { LoginResolver } from './services/login-resolver.service';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { animation: 'LoginPage' },
    resolve: {isAuthenticated: LoginResolver}
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'DashboardPage' },
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  }
];
