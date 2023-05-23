import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVendaComponent } from './dialog-venda.component';

describe('DialogVendaComponent', () => {
  let component: DialogVendaComponent;
  let fixture: ComponentFixture<DialogVendaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVendaComponent]
    });
    fixture = TestBed.createComponent(DialogVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
