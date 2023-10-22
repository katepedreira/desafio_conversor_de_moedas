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

  getExchangeRates(): Observable<any> {
    const params = new HttpParams()
      .set('base', 'USD');

    return this.http.get(`${this.apiUrl}${this.key}/latest`, { params });
  }

  converterCurrency(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    const params = new HttpParams()
      .set('from', moedaOrigem)
      .set('to', moedaDestino)
      .set('amount', valor.toString());

    return this.http.get(`${this.apiUrl}convert`, { params });
  }

  testApiRequest(): Observable<any> {
    return this.http.get(`${this.apiUrl}list`, {
      params: new HttpParams().set('access_key', this.key)
    });
  }
}
