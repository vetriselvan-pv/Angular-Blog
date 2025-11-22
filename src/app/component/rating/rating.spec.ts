import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rating } from './rating';

describe('Rating', () => {
  let component: Rating;
  let fixture: ComponentFixture<Rating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
