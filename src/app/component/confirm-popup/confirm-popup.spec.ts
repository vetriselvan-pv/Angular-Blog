import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPopup } from './confirm-popup';

describe('ConfirmPopup', () => {
  let component: ConfirmPopup;
  let fixture: ComponentFixture<ConfirmPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
