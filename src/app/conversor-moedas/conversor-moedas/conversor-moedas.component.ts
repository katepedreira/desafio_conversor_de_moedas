import { Component } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';
import { HistoricoConversoesService } from 'src/app/historico-conversoes/historico-conversoes.service';
import { v4 as uuidv4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private historicoService: HistoricoConversoesService,
    private snackBar: MatSnackBar
  ) {}


  converterMoeda() {
    if (!this.moedaOrigem || this.moedaOrigem === 'selecione') {
      this.exibirAlertaErro('Selecione uma moeda de origem.');
    } else if (!this.moedaDestino) {
      this.exibirAlertaErro('Selecione uma moeda de destino.');
    } else if (this.valor <= 0) {
      this.exibirAlertaErro('O valor de conversão deve ser maior que 0.');
    } else {
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
              taxaCambio: this.taxaDeConversao,
            };
            console.log(conversao.id);
            this.historicoService.adicionarConversao(conversao);
            const conversaoString = JSON.stringify(conversao);
            localStorage.setItem('conversao-1', conversaoString);
          } else {
            this.exibirAlertaErro('Erro na conversão de moeda: ' + response.error_message);
          }
        },
        (error: any) => {
          this.exibirAlertaErro('Erro na conversão de moeda: ' + error.message);
        }
      );
    }
  }

  exibirAlertaErro(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
    });
  }

  ngOnInit() {
    this.principalService.getCurrenciesNames().subscribe(
      (response: any) => {
        if (response.result === 'success' && response.supported_codes) {
          this.moedas = response.supported_codes.map((currency: any) => {
            return {
              name: currency[1],
              symbol: currency[0],
            };
          });
        }
      },
      (error: any) => {
        this.exibirAlertaErro('Erro ao obter a lista de moedas: ' + error.message);
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






