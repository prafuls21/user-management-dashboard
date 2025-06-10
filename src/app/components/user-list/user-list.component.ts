import { Component, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  private userService = inject(UserService);
  
  displayedColumns = ['name', 'email', 'mobile', 'address', 'active', 'actions'];
  users = this.userService.getUsers();
  
  filteredUsers = signal<User[]>([]);
  searchTerm = signal('');
  
  // Pagination
  pageSize = signal(5);
  pageIndex = signal(0);
  pageSizeOptions = [5, 10, 25];
  
  // Sorting
  sortDirection = signal<'asc' | 'desc'>('asc');
  sortActive = signal('name');
  
  constructor() {
    this.filterUsers();
  }
  
  filterUsers() {
    let result = this.users().filter(user => 
      user.name.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
      user.address.toLowerCase().includes(this.searchTerm().toLowerCase())
    );
    
    // Apply sorting
    result = this.sortData(result);
    
    this.filteredUsers.set(result);
  }
  
  onSearchChange() {
    this.pageIndex.set(0);
    this.filterUsers();
  }
  
  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }
  
  onSortChange(sort: Sort) {
    this.sortActive.set(sort.active);
    this.sortDirection.set(sort.direction as 'asc' | 'desc');
    this.filterUsers();
  }
  
  sortData(data: User[]): User[] {
    if (!this.sortActive() || !this.sortDirection()) {
      return data;
    }
    
    return data.sort((a, b) => {
      const isAsc = this.sortDirection() === 'asc';
      switch (this.sortActive()) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'email': return compare(a.email, b.email, isAsc);
        case 'mobile': return compare(a.mobile, b.mobile, isAsc);
        case 'address': return compare(a.address, b.address, isAsc);
        case 'active': return compare(a.active, b.active, isAsc);
        default: return 0;
      }
    });
  }
  
  getPaginatedUsers() {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.filteredUsers().slice(startIndex, startIndex + this.pageSize());
  }
}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}