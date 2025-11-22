import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleSession } from './idle-session';

describe('IdleSession', () => {
  let component: IdleSession;
  let fixture: ComponentFixture<IdleSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdleSession]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdleSession);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
