import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsOperator } from './js-operator';

describe('JsOperator', () => {
  let component: JsOperator;
  let fixture: ComponentFixture<JsOperator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JsOperator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsOperator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
