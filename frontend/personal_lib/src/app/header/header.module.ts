import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {MainMenuComponent} from "./main-menu/main-menu.component";
import {ContactsComponent} from "./contacts/contacts.component";
import {AboutComponent} from "./about/about.component";
import {SendBackupComponent} from "./send-backup/send-backup.component";
import {SaveChangesComponent} from "./save-changes/save-changes.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {TemplateTypeCatalogComponent} from './main-menu/template-type-catalog/template-type-catalog.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [
    HeaderComponent,
    MainMenuComponent,
    ContactsComponent,
    AboutComponent,
    SendBackupComponent,
    SaveChangesComponent,
  ],
  declarations: [
    HeaderComponent,
    MainMenuComponent,
    ContactsComponent,
    AboutComponent,
    SendBackupComponent,
    SaveChangesComponent,
    TemplateTypeCatalogComponent,
  ],
  providers: [

  ]
})

export class HeaderModule { }
