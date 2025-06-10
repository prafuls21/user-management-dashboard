import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  user = this.userService.getUserById(this.route.snapshot.paramMap.get('id')!);
  
  goBack() {
    this.router.navigate(['/users']);
  }
  
  editUser() {
    this.router.navigate(['/users', this.user?.userid, 'edit']);
  }
}