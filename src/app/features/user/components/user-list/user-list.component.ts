import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router, RouterLink} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";
import {IUser} from "../../../../core/models/user.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  userService = inject(UserService);
  userList: any[] = [];
  router = inject(Router);
  isLoading = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  onDelete(id: number | undefined) {
    const isDelete = confirm('Are you sure you want to delete this user?');
    if (isDelete) {
      this.userService.deleteUser(id).subscribe((res: any) => {
        if (res) {
          this.loadUsers();
        } else {
          alert('Something went wrong');
        }
      })
    }
  }

  onEdit(id: number | undefined){
    this.router.navigate(['/edit-user', id])
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe((res: any) => {
      if (res) {
        this.isLoading = false;
        this.userList = res.data;
      } else {
        alert('Something went wrong');
      }
    })
  }
}
