import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBookSubmitComponent } from './delete-book-submit.component';

describe('DeleteItemSubmitComponent', () => {
  let component: DeleteBookSubmitComponent;
  let fixture: ComponentFixture<DeleteBookSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBookSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBookSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
