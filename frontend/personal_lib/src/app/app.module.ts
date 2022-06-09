import { LOCALE_ID, NgModule } from '@angular/core';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule} from "./app-routing.module";
import {HeaderModule} from "./header/header.module";
import {BookModule} from "./item-operations/book/book.module";
import {TypeModule} from "./shared/components/type-operations/type.module";
import {PlaceModule} from "./shared/components/place-operations/place.module";

import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { CrudService } from './shared/crud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { LogoutComponent } from './auth/logout/logout.component';
// import { XhrInterceptor } from './auth/xhrIntercepror';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    HeaderModule,
    BookModule,
    TypeModule,
    PlaceModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "ru" },
    CrudService,
    AuthService,
    // XhrInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
