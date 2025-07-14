import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormLogin } from './reactive-form-login';

describe('ReactiveFormLogin', () => {
  let component: ReactiveFormLogin;
  let fixture: ComponentFixture<ReactiveFormLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveFormLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
