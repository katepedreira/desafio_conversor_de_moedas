import { Component, OnInit } from '@angular/core';
import { HistoricoConversoesService } from '../historico-conversoes.service';
import { IHistoricoConversoes } from 'src/app/model/IHistoricoConversoes';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.css']
})
export class HistoricoConversoesComponent implements OnInit {

  displayedColumns: string[] = ['data', 'hora', 'moedaOrigem', 'valorOrigem', 'moedaDestino', 'valorDestino', 'taxaCambio', 'acoes'];
  historico: MatTableDataSource<IHistoricoConversoes> = new MatTableDataSource<IHistoricoConversoes>([]);



  constructor(private historicoService: HistoricoConversoesService) {}

  ngOnInit(): void {
    this.historico = new MatTableDataSource<IHistoricoConversoes>(this.historicoService.obterHistoricoCompleto());
  }

  excluirConversao(conversao: IHistoricoConversoes) {
    this.historicoService.excluirConversao(conversao);
    this.historico.data = this.historicoService.obterHistoricoCompleto();
  }
}




