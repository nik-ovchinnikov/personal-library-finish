import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChangeFormComponent } from './book-change-form.component';

describe('ItemChangeFormComponent', () => {
  let component: BookChangeFormComponent;
  let fixture: ComponentFixture<BookChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookChangeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
