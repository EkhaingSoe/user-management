import { TableAction, TableColumn } from './../../../../shared/components/data-table/data-table.component';
// src/app/features/pages/user-list/user-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { User } from '../../../../models/user';
import { UserService } from '../../user.service';



@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  showDeleteModal = false;
  userToDelete: User | null = null;

  columns: TableColumn[] = [
    { key: 'userName', label: 'User Name', type: 'custom', sortable: true },
    {
      key: 'departmentName',
      label: 'Department Name',
      type: 'text',
      sortable: true,
    },
    { key: 'designation', label: 'Designation', type: 'text', sortable: true },
    {
      key: 'mobileNumber',
      label: 'Mobile Number',
      type: 'custom',
      sortable: true,
    },
    { key: 'userType', label: 'User Type', type: 'badge', sortable: true },
    {
      key: 'transactionCount',
      label: 'Transaction Count',
      type: 'number',
      sortable: true,
    },
    {
      key: 'rolePermissionCount',
      label: 'Role Permission Count',
      type: 'number',
      sortable: true,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      sortable: true,
    },
    {
      key: 'isActive',
      label: 'isActive',
      type: 'text',
      sortable: true,
    },
    {
      key: 'createdDateAndTime',
      label: 'Permission Date and Time',
      type: 'text',
      sortable: true,
    },
  ];

  actions: TableAction[] = [
    {
      label: 'View',
      class: 'text-blue-500 hover:text-blue-700',
      action: 'view',
    },
    {
      label: 'Edit',
      class: 'text-green-600 hover:text-green-800',
      action: 'edit',
    },
    {
      label: 'Delete',
      class: 'text-red-500 hover:text-red-700',
      action: 'delete',
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService
      .getAllUsers()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (response: User[]) => {
          this.users = response;
          console.log('Users fetched successfully:', this.users);
        },
        error: (err) => {
          console.error('API Error:', err);
          this.users = this.getMockData();
        },
      });
  }

  private getMockData(): User[] {
    return [
      {
        id: '1',
        userName: 'John Doe',
        departmentName: 'IT',
        companyName: 'Tech Corp',
        designation: 'Software Developer',
        mobileNumber: '09987654321',
        operatorName: 'Telenor',
        userType: 'Admin',
        transactionCount: 15,
        rolePermissionCount: 8,
        description: 'Senior developer',
        createdUserName: 'superAdmin',
        isActive: true,
        createdDateAndTime: new Date().toLocaleString(),
      },
    ];
  }

  onTableAction(event: { action: string; row: User }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/users', event.row.id]);
        break;
      case 'edit':
        this.router.navigate(['/users/edit', event.row.id]);
        break;
      case 'delete':
        this.confirmDelete(event.row);
        break;
    }
  }

  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  deleteUser(): void {
    if (!this.userToDelete?.id) return;

    this.userService
      .deleteUser(this.userToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.loadUsers();
            this.closeDeleteModal();
          }
        },
        error: () => {
          this.users = this.users.filter((u) => u.id !== this.userToDelete?.id);
          this.closeDeleteModal();
        },
      });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  createUser(): void {
    this.router.navigate(['/users/create']);
  }

  getUserInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }
}
