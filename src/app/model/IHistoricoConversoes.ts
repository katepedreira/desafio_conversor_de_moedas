export interface IHistoricoConversoes {
  id: string;
  data: Date;
  hora: Date;
  valorOrigem: number;
  moedaOrigem: string;
  valorDestino: number;
  moedaDestino: string;
  taxaCambio: number;
}
