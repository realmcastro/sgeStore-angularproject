import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    constructor(private router: Router,
    private authService: AuthService
  ){}
  removetoken(){
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
