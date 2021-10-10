import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Member }  from "../_models/member";
import {of} from "rxjs";
import {map} from "rxjs/operators";

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
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers(){
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl + 'User').pipe(
      map(members => {
        this.members = members;
        return members;
      })
    );
  }

  getMember(username: string){
    const member = this.members.find(x => x.userName === username);
    if (member !== undefined) return  of(member);
    return this.http.get<Member>(this.baseUrl + 'User/' + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'User', member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'User/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'User/delete-photo/' + photoId);
  }
}
