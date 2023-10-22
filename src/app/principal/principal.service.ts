// import { Injectable } from '@angular/core';
// import {HttpClient} from "@angular/common/http";
// import { Observable } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';



// @Injectable({
//   providedIn: 'root'
// })
// export class PrincipalService {

//   // private apiUrl = 'http://api.exchangerate.host/';
//   // private key = '8bd2dc3a2a9a64d321b4d912637920e9'

//   // constructor(private http: HttpClient) { }

//   // listarMoedas(): Observable<any> {
//   //   const options = {
//   //     headers: new HttpHeaders({
//   //       'Content-Type':  'application/json',
//   //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjFjM2M5OTYxYTUyNWQ2OWQ4MTI1ZTFhZGY5NzBiNyIsInN1YiI6IjYyOWZlNWNlMzVkMWJjMDA5YjU3NzdlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zBrUteoQPPsjlA4SjGddHnB5t_bFMobHOsNdUAbkzYw'
//   //     })
//   //   };

//   //   return this.http.get("https://api.themoviedb.org/3/account/"+12634572+"/favorite/movies", options);

//   //   }





//   // getTaxasDeCambio(): Observable<any> {
//   //   return this.http.get(`${this.apiUrl}/live?${this.key}`);
//   // }

//   // converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
//   //   return this.http.get(
//   //     `${this.apiUrl}/convert?${this.key}&from=${moedaOrigem}&to=${moedaDestino}&amount=${valor}`
//   //   );
//   // }


//   private apiUrl = 'https://v6.exchangerate-api.com/v6/';
//   private key = '3adae7f2dede16c68f5694ee';



//   constructor(private http: HttpClient) { }

//   getSupportedCurrencies(): Observable<any> {
//   return this.http.get(`${this.apiUrl}${this.key}/latest/USD`);
//   console.log(this.getSupportedCurrencies)

// }


//   getTaxasDeCambio(): Observable<any> {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.key}`
//     });

//     return this.http.get(`${this.apiUrl}live`, { headers });
//   }

//   converterMoeda(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
//     const params = {
//       from: moedaOrigem,
//       to: moedaDestino,
//       amount: valor.toString()
//     };

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.key}`
//     });

//     return this.http.get(`${this.apiUrl}convert`, { params, headers });
//   }

//   testApiRequest(): Observable<any> {
//     return this.http.get(`${this.apiUrl}list?access_key=${this.key}`);
//   }



//   }


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
    return this.http.get(`${this.apiUrl}${this.key}/latest/USD`);
  }

  getExchangeRates(): Observable<any> {
    // Montando os parâmetros da solicitação
    const params = new HttpParams()
      .set('base', 'USD'); // Define a moeda base, no caso, USD

    return this.http.get(`${this.apiUrl}${this.key}/latest`, { params });
  }

  converterCurrency(valor: number, moedaOrigem: string, moedaDestino: string): Observable<any> {
    // Montando os parâmetros da solicitação
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
