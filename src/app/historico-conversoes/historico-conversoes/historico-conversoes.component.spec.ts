import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoConversoesComponent } from './historico-conversoes.component';

describe('HistoricoConversoesComponent', () => {
  let component: HistoricoConversoesComponent;
  let fixture: ComponentFixture<HistoricoConversoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricoConversoesComponent]
    });
    fixture = TestBed.createComponent(HistoricoConversoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
