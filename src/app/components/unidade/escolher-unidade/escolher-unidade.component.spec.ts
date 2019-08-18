import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherUnidadeComponent } from './escolher-unidade.component';

describe('EscolherUnidadeComponent', () => {
  let component: EscolherUnidadeComponent;
  let fixture: ComponentFixture<EscolherUnidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherUnidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolherUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
