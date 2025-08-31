import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLiterals } from './template-literals';

describe('TemplateLiterals', () => {
  let component: TemplateLiterals;
  let fixture: ComponentFixture<TemplateLiterals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateLiterals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateLiterals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
