import { Component } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';
import { HistoricoConversoesService } from 'src/app/historico-conversoes/historico-conversoes.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-conversor-moedas',
  templateUrl: './conversor-moedas.component.html',
  styleUrls: ['./conversor-moedas.component.css']
})
export class ConversorMoedasComponent {
  moedas: any[] = [];
  moedaOrigem: string = 'selecione';
  moedaDestino: string = '';
  valor: number = 0;
  valorConvertido: number = 0;
  taxaDeConversao: number = 0;
  mostrarResultado: boolean = false;


  constructor(
    private principalService: PrincipalService,
    private historicoService: HistoricoConversoesService
  ) {}


  converterMoeda() {
    if (this.moedaOrigem && this.moedaOrigem !== 'selecione' && this.moedaDestino && this.valor) {
      this.principalService.getExchangeRate(this.moedaOrigem, this.moedaDestino, this.valor).subscribe(
        (response: any) => {
          if (response.result === 'success' && response.conversion_rate) {
            this.valorConvertido = response.conversion_result;
            this.taxaDeConversao = response.conversion_rate;
            this.mostrarResultado = true;

            const id = uuidv4();
            const conversao = {
              id: id,
              data: new Date(),
              hora: new Date(),
              moedaOrigem: this.moedaOrigem,
              valorOrigem: this.valor,
              moedaDestino: this.moedaDestino,
              valorDestino: this.valorConvertido,
              taxaCambio: this.taxaDeConversao
            };
            this.historicoService.adicionarConversao(conversao);
            const conversaoString = JSON.stringify(conversao);
            localStorage.setItem('conversao-1', conversaoString);

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

  realizarNovaConversao() {
    this.mostrarResultado = false;
    this.moedaOrigem = 'selecione';
    this.moedaDestino = '';
    this.valor = 0;
    this.valorConvertido = 0;
    this.taxaDeConversao = 0;
  }

}
