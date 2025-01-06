import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeAnimations } from './animations/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
  RouterOutlet,
    CommonModule
    
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[
    routeAnimations
  ]
})
export class AppComponent {
  title = 'sgeStore-angular';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
