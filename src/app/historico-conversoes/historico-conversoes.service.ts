import { Injectable } from '@angular/core';
import { IHistoricoConversoes } from '../model/IHistoricoConversoes';


// @Injectable({
//   providedIn: 'root'
// })
// export class HistoricoConversoesService {

//   constructor() { }
// }

@Injectable({
  providedIn: 'root',
})
export class HistoricoConversoesService {
  private historico: IHistoricoConversoes[] = [];

  adicionarConversao(conversao: IHistoricoConversoes) {
    this.historico.push(conversao);
  }

  obterHistoricoCompleto(): IHistoricoConversoes[] {
    return this.historico;
  }

  excluirConversao(conversao: IHistoricoConversoes) {
    const index = this.historico.indexOf(conversao);
    if (index !== -1) {
      this.historico.splice(index, 1);
    }
  }

  obterConversaoPorId(id: string): IHistoricoConversoes | undefined {
    return this.historico.find((conversao) => conversao.id === id);
  }
}
