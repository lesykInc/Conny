import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Member }  from "../_models/member";
import {of} from "rxjs";
import {map} from "rxjs/operators";
import {PaginationResult} from "../_models/pagination";

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
  paginatedResult: PaginationResult<Member[]> = new PaginationResult<Member[]>();

  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number){
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }
    return this.http.get<Member[]>(this.baseUrl + 'User', {observe: 'response', params}).pipe(
      map(res => {
        this.paginatedResult.result = res.body;
        if (res.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(res.headers.get('Pagination'))
        }
        return this.paginatedResult;
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
