import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = signal<User[]>([
    {
      userid: '1',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: 1234567890,
      address: '123 Main St, Anytown, USA',
      active: true
    },
    {
      userid: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: 9876543210,
      address: '456 Oak Ave, Somewhere, USA',
      active: true
    },

    {
    userid: 'u001',
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    mobile: 9876543210,
    address: '123 Maple Street, Springfield, IL',
    active: true
  },
  {
    userid: 'u002',
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    mobile: 8765432109,
    address: '456 Oak Avenue, Lincoln, NE',
    active: false
  },
  {
    userid: 'u003',
    name: 'Charlie Brown',
    email: 'charlie.brown@example.com',
    mobile: 7654321098,
    address: '789 Pine Road, Austin, TX',
    active: true
  },
  {
    userid: 'u004',
    name: 'Diana Prince',
    email: 'diana.prince@example.com',
    mobile: 6543210987,
    address: '321 Birch Blvd, Seattle, WA',
    active: true
  },
  {
    userid: 'u005',
    name: 'Ethan Hunt',
    email: 'ethan.hunt@example.com',
    mobile: 5432109876,
    address: '100 Mission Street, Los Angeles, CA',
    active: false
  }
    // Add more dummy users as needed
  ]);

  getUsers() {
    return this.users.asReadonly();
  }

  getUserById(id: string) {
    return this.users().find(user => user.userid === id);
  }

  addUser(user: User) {
    this.users.update(users => [...users, user]);
  }

  updateUser(updatedUser: User) {
    this.users.update(users => 
      users.map(user => user.userid === updatedUser.userid ? updatedUser : user)
    );
  }

  deleteUser(id: string) {
    this.users.update(users => users.filter(user => user.userid !== id));
  }
}