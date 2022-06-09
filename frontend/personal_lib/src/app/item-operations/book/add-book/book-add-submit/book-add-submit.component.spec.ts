import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAddSubmitComponent } from './book-add-submit.component';

describe('ItemAddSubmitComponent', () => {
  let component: BookAddSubmitComponent;
  let fixture: ComponentFixture<BookAddSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAddSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAddSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
