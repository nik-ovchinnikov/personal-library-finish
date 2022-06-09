import { Component, Input, OnInit } from '@angular/core';
import { TemplateData } from './templateData';

@Component({
  selector: 'app-template-type-catalog',
  templateUrl: './template-type-catalog.component.html',
  styleUrls: ['./template-type-catalog.component.css']
})
export class TemplateTypeCatalogComponent implements OnInit {

  showBookCatalog = false;
  @Input()
  catalogType = "";
  templateDataMap = new Map([
   ["book", new TemplateData('книг', 'Книги', 'book')],
   ["icon", new TemplateData('икон', 'Иконы', 'icon')],
   ["relics", new TemplateData('мощей', 'Мощи', 'relics')],
   ["sacredItems", new TemplateData('священных предметов', 'Священные предметы', 'sacredItems')],
   ["churchItems", new TemplateData('церковной утвари', 'Церковная утварь', 'churchItems')],
  ]);
  title: any;
  column: any;
  urlParam: any;

  constructor() { }

  ngOnInit(): void {
    this.title = this.templateDataMap.get(this.catalogType)?.typeInTitle; 
    this.column= this.templateDataMap.get(this.catalogType)?.typeInColumn; 
    this.urlParam= this.templateDataMap.get(this.catalogType)?.typeInURL; 
  }

  onBooksClicked() {
    this.showBookCatalog = !this.showBookCatalog;
  }

}
