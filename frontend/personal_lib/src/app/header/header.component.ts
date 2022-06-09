import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private app: AuthService, private http: HttpClient, private router: Router) {
    this.app.authenticate(undefined, undefined);
  }
  logout() {
    // this.http.post('/logout', {})
    // .subscribe(() => {
    //   console.log("logout");

    // });
    // this.http.get("/logout").subscribe(() => {
    //   console.log("logout");
    // });
    console.log("logout123");
    this.router.navigateByUrl("/logout");
  }

}
