import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule,RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users = inject(UserService).getUsers();
  
  get activeUsersCount() {
    return this.users().filter(user => user.active).length;
  }
  
  get inactiveUsersCount() {
    return this.users().filter(user => !user.active).length;
  }
  
  get totalUsersCount() {
    return this.users().length;
  }
}