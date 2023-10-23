import { Component } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';

@Component({
  selector: 'app-conversor-moedas',
  templateUrl: './conversor-moedas.component.html',
  styleUrls: ['./conversor-moedas.component.css']
})
export class ConversorMoedasComponent {
  moedas: any[] = []; // Deve ser um array de objetos com propriedades 'name' e 'symbol'
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
    this.principalService.getCurrenciesNames().subscribe(
      (response: any) => {
        if (response.result === 'success' && response.supported_codes) {
          this.moedas = response.supported_codes.map((currency: any) => {
            return {
              name: currency[1],
              symbol: currency[0]
            };
          });
        }
      },
      (error: any) => {
        console.error('Erro ao obter a lista de moedas:', error);
      }
    );
  }
}

