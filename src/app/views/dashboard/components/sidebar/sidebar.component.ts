import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { routes, Route } from '../../../../interfaces/routes.interface';
import { CommonModule } from '@angular/common';

declare global {
  interface Window {
    Toastify: any;  // Declare o Toastify global
  }
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private router: Router, private authService: AuthService) {}

  routeStruct: Record<string, Route> = routes;

  removetoken() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  toggleCanvasClass() {
    const canvasElements = document.getElementsByClassName('togglecanvas');
    if (canvasElements.length > 0) {
      const canvasElement = canvasElements[0];
      canvasElement.className = canvasElement.classList.contains('show')
        ? canvasElement.className.replace('show', '').trim()
        : `${canvasElement.className} show`.trim();
    } else {
      console.error('Elemento com classe "togglecanvas" não encontrado.');
    }
  }

  admin_required() {
    this.toggleCanvasClass();
    this.toast_error();
  }

  toast_error(){
    if (window.Toastify) {
      window.Toastify({
        text: "Não autorizado!",
        duration: 3000,  
        close: false,     
        gravity: "top",  
        position: "right",  
        backgroundColor: "linear-gradient(to right,rgb(148, 22, 0), #FF4500)", // Cor de fundo
      }).showToast();
    } else {
      console.error('Toastify não está disponível.');
    }
  }
}
