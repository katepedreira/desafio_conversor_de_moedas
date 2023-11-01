import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { IHistoricoConversoes } from 'src/app/model/IHistoricoConversoes';
import { HistoricoConversoesService } from '../historico-conversoes.service';

@Component({
  selector: 'app-historico-conversoes',
  templateUrl: './historico-conversoes.component.html',
  styleUrls: ['./historico-conversoes.component.css'],
})
export class HistoricoConversoesComponent implements OnInit {
  displayedColumns: string[] = [
    'data',
    'hora',
    'moedaOrigem',
    'valorOrigem',
    'moedaDestino',
    'valorDestino',
    'taxaCambio',
    'acoes',
  ];
  historico: MatTableDataSource<IHistoricoConversoes> = new MatTableDataSource<IHistoricoConversoes>([]);

  pageSize: number = 10;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private historicoService: HistoricoConversoesService) {
    this.historico = new MatTableDataSource<IHistoricoConversoes>([]);
  }

  ngOnInit(): void {
    const historicoData = JSON.parse(localStorage.getItem('historico') || '[]');
    historicoData.reverse();
    this.historico.data = historicoData;
    this.historico.sort = this.sort;
    this.historico.paginator = this.paginator;
  }

  excluirConversao(id: string) {
    this.historicoService.excluirConversao(id);
    this.historico = new MatTableDataSource<IHistoricoConversoes>(this.historicoService.obterHistoricoCompleto());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.historico.filter = filterValue.trim().toLowerCase();
  }
}




