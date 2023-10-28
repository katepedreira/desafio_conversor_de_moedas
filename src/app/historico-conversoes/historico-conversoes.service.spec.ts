import { TestBed } from '@angular/core/testing';

import { HistoricoConversoesService } from './historico-conversoes.service';

describe('HistoricoConversoesService', () => {
  let service: HistoricoConversoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoConversoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
