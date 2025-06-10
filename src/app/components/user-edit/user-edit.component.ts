import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
//import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule, CommonModule,RouterModule
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  
  userForm!: FormGroup;
  isNewUser = false;
  userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('UserEditComponent:', this.userId);
    //debugger;
    this.isNewUser = this.userId === 'new';
    //console.log('Is new user:', this.isNewUser);
    //console.log('User ID:', this.userId);
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
      active: [true]
    });
    
    if (!this.isNewUser && this.userId) {
      const user = this.userService.getUserById(this.userId);
      if (user) {
        this.userForm.patchValue(user);
      }
    }
  }
  
  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      
      if (this.isNewUser) {
        // Generate a simple ID for new users
        userData.userid = Math.random().toString(36).substring(2, 9);
        this.userService.addUser(userData);
      } else if (this.userId) {
        userData.userid = this.userId;
        this.userService.updateUser(userData);
      }
      
      this.router.navigate(['/users']);
    }
  }
  
  onCancel(): void {
    this.router.navigate(['/users']);
  }
  
  get name() { return this.userForm.get('name'); }
  get email() { return this.userForm.get('email'); }
  get mobile() { return this.userForm.get('mobile'); }
  get address() { return this.userForm.get('address'); }
}