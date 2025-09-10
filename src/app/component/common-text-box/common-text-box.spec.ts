import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTextBox } from './common-text-box';

describe('CommonTextBox', () => {
  let component: CommonTextBox;
  let fixture: ComponentFixture<CommonTextBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonTextBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonTextBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
