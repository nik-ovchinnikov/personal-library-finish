import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBookDeleteComponent } from './choose-book-delete.component';

describe('ChooseItemDeleteComponent', () => {
  let component: ChooseBookDeleteComponent;
  let fixture: ComponentFixture<ChooseBookDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseBookDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBookDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
