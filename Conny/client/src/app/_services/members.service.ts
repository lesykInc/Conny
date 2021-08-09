import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Member }  from "../_models/member";

// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer' +  JSON.parse(localStorage.getItem('user') || '{}')?.token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl + 'User');
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl + 'User/' + username);
  }
}