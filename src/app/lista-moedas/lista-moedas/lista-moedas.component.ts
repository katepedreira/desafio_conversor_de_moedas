import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrincipalService } from 'src/app/principal/principal.service';
import { IListaMoedas } from 'src/app/model/IListaMoedas';


@Component({
  selector: 'app-lista-moedas',
  templateUrl: './lista-moedas.component.html',
  styleUrls: ['./lista-moedas.component.css']
})
export class ListaMoedasComponent implements OnInit {
  displayedColumns: string[] = ['symbol', 'name'];
  dataSource: MatTableDataSource<IListaMoedas> = new MatTableDataSource<IListaMoedas>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private principalService: PrincipalService) { }

  ngOnInit() {
    this.principalService.getSupportedCurrencies().subscribe((data) => {
      const currencies: IListaMoedas[] = [];
      for (const symbol in data.currencies) {
        currencies.push({
          symbol: symbol,
          name: data.currencies[symbol],
        });
      }
      this.dataSource.data = currencies;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
