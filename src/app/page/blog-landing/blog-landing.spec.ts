import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogLanding } from './blog-landing';

describe('BlogLanding', () => {
  let component: BlogLanding;
  let fixture: ComponentFixture<BlogLanding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogLanding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogLanding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
