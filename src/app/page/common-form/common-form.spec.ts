import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonForm } from './common-form';

describe('CommonForm', () => {
  let component: CommonForm;
  let fixture: ComponentFixture<CommonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
