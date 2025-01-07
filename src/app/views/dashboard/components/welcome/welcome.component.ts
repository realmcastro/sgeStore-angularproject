import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,  // Marca o componente como standalone
  imports: [CommonModule],  // CommonModule é necessário para diretivas estruturais como *ngIf
  providers: [DatePipe],  // Adiciona o DatePipe aos providers
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']  // Corrigido para styleUrls (plural)
})
export class WelcomeComponent implements OnInit {
  constructor(private datePipe: DatePipe, private service: ApiService, private userService: AuthService) {}

  info: any;
  dataSale: any;

  ngOnInit(): void {
    this.info = this.userService.getUser();
    this.service.get('data/getData/').subscribe({
      next: (response: any) => {
        console.log('dados recebidos:', response);
        this.dataSale = response;

        // Verifica se dataSale.date está presente e a formata
        if (this.dataSale.date) {
          this.dataSale.date = this.datePipe.transform(this.dataSale.date, 'dd/MM/yyyy');
        }

        console.log('Data formatada:', this.dataSale.date);  // Verifique a data formatada
      },
      error: (error: any) => {
        console.error('erro ao carregar os dados', error);
      }
    });
  }
}
