import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Renderer } from './renderer';

describe('Renderer', () => {
  let component: Renderer;
  let fixture: ComponentFixture<Renderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Renderer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Renderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
