import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBookChangeComponent } from './choose-book-change.component';

describe('ChooseItemChangeComponent', () => {
  let component: ChooseBookChangeComponent;
  let fixture: ComponentFixture<ChooseBookChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBookChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBookChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
