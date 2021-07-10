import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'client';
  users: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get('https://localhost:44358/api/users').subscribe(responce => {
      this.users = responce;
    }, error => {
      console.log(error);
    })
  }
}
