import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string | undefined;
  password: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (this.username && this.password) {
      const body = {
        username: this.username,
        password: this.password
      };
      this.apiService.post('user/login/', body).subscribe(
        (response: any) => {
          this.authService.setToken(response.token);
          console.log('Login bem sucedido!', response);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          this.errorMessage = 'Erro ao tentar fazer login. Verifique suas credenciais.';
          console.log(error);
        }
      );
    } else {
      this.errorMessage = 'Username e password são obrigatórios.';
    }
  }

  ngOnInit(): void {
  }
}