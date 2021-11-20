import { Component, OnInit } from '@angular/core';
import { Member } from "../../_models/member";
import { MembersService } from "../../_services/members.service";
import { Pagination } from "../../_models/pagination";
import {PageChangedEvent} from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(res => {
      this.members = res.result;
      this.pagination = res.pagination;
    })
  }

  pageChanged($event: PageChangedEvent) {
    this.pageNumber = $event.page;
    this.loadMembers();
  }
}
