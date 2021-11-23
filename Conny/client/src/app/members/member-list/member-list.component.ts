import { Component, OnInit } from '@angular/core';
import { Member } from "../../_models/member";
import { MembersService } from "../../_services/members.service";
import { Pagination } from "../../_models/pagination";
import { PageChangedEvent } from "ngx-bootstrap/pagination";
import { UserParams } from "../../_models/userParams";
import { AccountService } from "../../_services/account.service";
import { take } from "rxjs/operators";
import { User } from "../../_models/user";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}]

  constructor(private memberService: MembersService,
              private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.userParams).subscribe(res => {
      this.members = res.result;
      this.pagination = res.pagination;
    })
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  pageChanged($event: PageChangedEvent) {
    this.userParams.pageNumber = $event.page;
    this.loadMembers();
  }
}
