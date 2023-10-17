import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  // private apiUrl = 'http://api.exchangerate.host/';
  // private key = '8bd2dc3a2a9a64d321b4d912637920e9'

  // constructor(private http: HttpClient) { }

  // listarMoedas(): Observable<any> {
  //   const options = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjFjM2M5OTYxYTUyNWQ2OWQ4MTI1ZTFhZGY5NzBiNyIsInN1YiI6IjYyOWZlNWNlMzVkMWJjMDA5YjU3NzdlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zBrUteoQPPsjlA4SjGddHnB5t_bFMobHOsNdUAbkzYw'
  //     })
  //   };

  //   return this.http.get("https://api.themoviedb.org/3/account/"+12634572+"/favorite/movies", options);

  //   }





  // getTaxasDeCambio(): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/live?${this.key}`);
  // }

  // converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
  //   return this.http.get(
  //     `${this.apiUrl}/convert?${this.key}&from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`
  //   );
  // }


  private apiUrl = 'http://api.exchangerate.host/';
  private key = '8bd2dc3a2a9a64d321b4d912637920e9';

  constructor(private http: HttpClient) { }

  getSupportedCurrencies(): Observable<any> {
  return this.http.get(`${this.apiUrl}list?access_key=${this.key}`);
}


  getTaxasDeCambio(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    return this.http.get(`${this.apiUrl}live`, { headers });
  }

  converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    const params = {
      from: moedaOrigem,
      to: moedaDestino,
      amount: valor.toString()
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.key}`
    });

    return this.http.get(`${this.apiUrl}convert`, { params, headers });
  }

  testApiRequest(): Observable<any> {
    return this.http.get(`${this.apiUrl}list?access_key=${this.key}`);
  }



  }

