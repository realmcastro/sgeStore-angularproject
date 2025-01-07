import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
@Component({
  selector: 'app-dashboard',
  imports: [
    SidebarComponent,
    GraphsComponent,
    WelcomeComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(){}

 
}
