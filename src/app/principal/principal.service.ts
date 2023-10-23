import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private apiUrl = 'https://v6.exchangerate-api.com/v6/';
  private key = '3adae7f2dede16c68f5694ee';

  constructor(private http: HttpClient) {}

  getSupportedCurrencies(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.key}/latest/BRL`);
  }

  getCurrenciesNames(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.key}/codes`);
  }

  converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    const params = {
      from: moedaOrigem,
      to: moedaDestino,
      amount: valor.toString()
    };

    return this.http.get(`${this.apiUrl}convert`, { params });
  }

  getListaDeMoedas(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.key}/currencies`);
  }

  getExchangeRate(base: string, target: string, amount?: number): Observable<any> {
    let url = `${this.apiUrl}${this.key}/pair/${base}/${target}`;
    if (amount) {
      url += `/${amount}`;
    }
    return this.http.get(url);
  }

  }

