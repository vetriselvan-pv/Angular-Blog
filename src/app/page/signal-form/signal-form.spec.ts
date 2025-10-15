import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalForm } from './signal-form';

describe('SignalForm', () => {
  let component: SignalForm;
  let fixture: ComponentFixture<SignalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
