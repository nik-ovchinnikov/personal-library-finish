import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateTypeCatalogComponent } from './template-type-catalog.component';

describe('BookCatalogComponent', () => {
  let component: TemplateTypeCatalogComponent;
  let fixture: ComponentFixture<TemplateTypeCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateTypeCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTypeCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
