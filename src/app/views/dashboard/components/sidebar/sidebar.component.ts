import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { routes, Route } from '../../../../interfaces/routes.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  routeStruct: Record<string, Route> = routes;

  removetoken() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}