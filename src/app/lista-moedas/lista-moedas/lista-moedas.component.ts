import { Component, OnInit, ViewChild } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';
import { MatTableDataSource } from '@angular/material/table';
import { IListaMoedas } from 'src/app/model/IListaMoedas';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-lista-moedas',
  templateUrl: './lista-moedas.component.html',
  styleUrls: ['./lista-moedas.component.css']
})

export class ListaMoedasComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'price'];
  dataSource: MatTableDataSource<IListaMoedas> = new MatTableDataSource<IListaMoedas>([]);
  pageSize: number = 10;

  @ViewChild('input', { static: true }) input: HTMLInputElement | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(private principalService: PrincipalService) {
    this.dataSource = new MatTableDataSource<IListaMoedas>([]);
  }

  ngOnInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.principalService.getSupportedCurrencies().subscribe(
      (response) => {
        if (response.result === 'success' && response.conversion_rates) {
          const currenciesArray = Object.keys(response.conversion_rates).map((symbol) => {
            return {
              symbol: symbol,
              price: response.conversion_rates[symbol]
            };
          });
          this.dataSource.data = currenciesArray;
        }
      },
      (error) => {
        console.error('Erro na solicitação:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}






