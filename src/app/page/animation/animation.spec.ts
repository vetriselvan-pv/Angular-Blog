import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Animation } from './animation';

describe('Animation', () => {
  let component: Animation;
  let fixture: ComponentFixture<Animation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Animation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Animation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
