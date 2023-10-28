import { Component, OnInit } from '@angular/core';
import { IHistoricoConversoes } from 'src/app/model/IHistoricoConversoes';
import { MatTableDataSource } from '@angular/material/table';
import { HistoricoConversoesService } from '../historico-conversoes.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.css']
})
export class HistoricoConversoesComponent implements OnInit {

  displayedColumns: string[] = ['data', 'hora', 'moedaOrigem', 'valorOrigem', 'moedaDestino', 'valorDestino', 'taxaCambio', 'acoes'];
  historico: MatTableDataSource<IHistoricoConversoes> = new MatTableDataSource<IHistoricoConversoes>([]);



  constructor(private historicoService: HistoricoConversoesService) {
    this.historico = new MatTableDataSource<IHistoricoConversoes>([]);
  }

  ngOnInit(): void {
    const historicoData = JSON.parse(localStorage.getItem('historico') || '[]');
    this.historico.data = historicoData;
  }

  excluirConversao(conversao: IHistoricoConversoes) {
    this.historicoService.excluirConversao(conversao);
    this.historico = new MatTableDataSource<IHistoricoConversoes>(this.historicoService.obterHistoricoCompleto());
  }

}




