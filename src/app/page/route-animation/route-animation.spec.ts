import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAnimation } from './route-animation';

describe('RouteAnimation', () => {
  let component: RouteAnimation;
  let fixture: ComponentFixture<RouteAnimation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouteAnimation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteAnimation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
