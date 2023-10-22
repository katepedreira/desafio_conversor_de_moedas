import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/principal/principal.service';
import { MatTableDataSource } from '@angular/material/table';
import { IListaMoedas } from 'src/app/model/IListaMoedas';

@Component({
  selector: 'app-lista-moedas',
  templateUrl: './lista-moedas.component.html',
  styleUrls: ['./lista-moedas.component.css']
})

export class ListaMoedasComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'name'];
  dataSource: MatTableDataSource<IListaMoedas>;

  constructor(private principalService: PrincipalService) {
    this.dataSource = new MatTableDataSource<IListaMoedas>([]);
  }

  ngOnInit() {
    this.principalService.getSupportedCurrencies().subscribe(
      (response) => {
        if (response.result === 'success' && response.conversion_rates) {
          const currenciesArray = Object.keys(response.conversion_rates).map((symbol) => {
            return {
              symbol: symbol,
              name: response.conversion_rates[symbol]
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






