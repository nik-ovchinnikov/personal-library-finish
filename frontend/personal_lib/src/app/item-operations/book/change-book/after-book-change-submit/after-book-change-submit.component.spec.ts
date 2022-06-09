import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterBookChangeSubmitComponent } from './after-book-change-submit.component';

describe('AfterItemChangeSubmitComponent', () => {
  let component: AfterBookChangeSubmitComponent;
  let fixture: ComponentFixture<AfterBookChangeSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterBookChangeSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterBookChangeSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
