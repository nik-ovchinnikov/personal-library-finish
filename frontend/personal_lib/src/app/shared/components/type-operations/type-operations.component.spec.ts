import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOperationsComponent } from './type-operations.component';

describe('TypeOperationsComponent', () => {
  let component: TypeOperationsComponent;
  let fixture: ComponentFixture<TypeOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
