import { Injectable } from '@angular/core';
import { IHistoricoConversoes } from '../model/IHistoricoConversoes';

@Injectable({
  providedIn: 'root',
})
export class HistoricoConversoesService {

  private historico: IHistoricoConversoes[] = [];

  constructor() {
    const historicoData = JSON.parse(localStorage.getItem('historico') || '[]');
    this.historico = historicoData;
  }


  adicionarConversao(conversao: IHistoricoConversoes) {
    this.historico.push(conversao);
    localStorage.setItem('historico', JSON.stringify(this.historico));
    console.log(conversao)
  }

  obterHistoricoCompleto(): IHistoricoConversoes[] {
    return this.historico;
  }

  excluirConversao(conversao: IHistoricoConversoes) {
    const index = this.historico.indexOf(conversao);
    if (index !== -1) {
      this.historico.splice(index, 1);
      this.atualizarLocalStorage();
    }
  }

  private atualizarLocalStorage() {
    localStorage.setItem('historico', JSON.stringify(this.historico));
  }

  private obterHistoricoLocalStorage(): IHistoricoConversoes[] {
    const historicoData = JSON.parse(localStorage.getItem('historico') || '[]');
    return historicoData;
  }

  obterConversaoPorId(id: string): IHistoricoConversoes | undefined {
    return this.historico.find((conversao) => conversao.id === id);
  }
}
