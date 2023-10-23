// import { Component, OnInit } from '@angular/core';
// import { PrincipalService } from 'src/app/principal/principal.service';

// @Component({
//   selector: 'app-conversor-moedas',
//   templateUrl: './conversor-moedas.component.html',
//   styleUrls: ['./conversor-moedas.component.css']
// })
// export class ConversorMoedasComponent implements OnInit {
//   // moedas: string[] = [];
//   moedas: string[] = ['USD', 'EUR', 'GBP', 'JPY'];
//   moedaOrigem: string = '';
//   moedaDestino: string = '';
//   valor: number = 0;
//   valorConvertido: number = 0;
//   taxaDeConversao: number = 0;

//   constructor(private principalService: PrincipalService) {}

//   converterMoeda() {
//     if (this.moedaOrigem && this.moedaDestino && this.valor) {
//       this.principalService.converterMoeda(this.valor, this.moedaOrigem, this.moedaDestino)
//         .subscribe(
//           (response: any) => {
//             if (response.result === 'success' && response.conversion_rate) {
//               this.valorConvertido = this.valor * response.conversion_rate;
//               this.taxaDeConversao = response.conversion_rate;
//             }
//           },
//           (error: any) => {
//             console.error('Erro na conversão de moeda:', error);
//           }
//         );
//     } else {
//       console.error('Por favor, preencha todos os campos antes de converter.');
//     }
//   }

//   ngOnInit() {
//     this.principalService.getListaDeMoedas().subscribe(
//       (response) => {
//         if (response.result === 'success' && response.currencies) {
//           this.moedas = Object.keys(response.currencies);
//         }
//       },
//       (error) => {
//         console.error('Erro ao obter a lista de moedas:', error);
//       }
//     );
//   }
// }

import { Component } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';

@Component({
  selector: 'app-conversor-moedas',
  templateUrl: './conversor-moedas.component.html',
  styleUrls: ['./conversor-moedas.component.css']
})
export class ConversorMoedasComponent {
  moedas: string[] = []; // Agora as moedas serão carregadas a partir do serviço
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  valorConvertido: number = 0;
  taxaDeConversao: number = 0;

  constructor(private principalService: PrincipalService) {}

  converterMoeda() {
    if (this.moedaOrigem && this.moedaDestino && this.valor) {
      this.principalService.getExchangeRate(this.moedaOrigem, this.moedaDestino, this.valor).subscribe(
        (response: any) => {
          if (response.result === 'success' && response.conversion_rate) {
            this.valorConvertido = response.conversion_result;
            this.taxaDeConversao = response.conversion_rate;
          }
        },
        (error: any) => {
          console.error('Erro na conversão de moeda:', error);
        }
      );
    } else {
      console.error('Por favor, preencha todos os campos antes de converter.');
    }
  }

  ngOnInit() {
    this.principalService.getListaDeMoedas().subscribe(
      (response: any) => {
        if (response.result === 'success' && response.currencies) {
          this.moedas = Object.keys(response.currencies);
        }
      },
      (error: any) => {
        console.error('Erro ao obter a lista de moedas:', error);
      }
    );
  }
}

