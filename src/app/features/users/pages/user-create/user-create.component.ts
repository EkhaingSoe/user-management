// src/app/features/users/pages/user-create/user-create.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { UserService } from '../../user.service';
import { User } from '../../../../models/user';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  submitting = false;
  private destroy$ = new Subject<void>();

  userName!: AbstractControl | null;
  password!: AbstractControl | null;
  companyName!: AbstractControl | null;
  departmentName!: AbstractControl | null;
  designation!: AbstractControl | null;
  mobileNumber!: AbstractControl | null;
  operatorName!: AbstractControl | null;
  userType!: AbstractControl | null;
  transactionCount!: AbstractControl | null;
  rolePermissionCount!: AbstractControl | null;
  createdUserName!: AbstractControl | null;
  isActive!: AbstractControl | null;
  createdDateAndTime!: AbstractControl | null;
  updatedDateAndTime!: AbstractControl | null;
  description!: AbstractControl | null;

  // Dropdown options
  userTypeOptions: SelectOption[] = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'User', label: 'User' },
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService, 
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeControlReferences();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      departmentName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      designation: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,11}$')],
      ],
      companyName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      userType: ['', Validators.required],
      operatorName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      transactionCount: [1, [Validators.required, Validators.min(0)]],
      rolePermissionCount: [0, [Validators.required, Validators.min(0)]],
      createdUserName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      isActive: [true],
      createdDateAndTime: [this.getNowString()],
      updatedDateAndTime: [''],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500),
        ],
      ],
    });

    // Set default values if needed
    // this.userForm.patchValue({
    //   userType: 'employee',
    //   transactionType: 'view'
    // });
  }

  private initializeControlReferences(): void {
    this.userName = this.userForm.get('userName');
    this.password = this.userForm.get('password');
    this.companyName = this.userForm.get('companyName');
    this.departmentName = this.userForm.get('departmentName');
    this.designation = this.userForm.get('designation');
    this.mobileNumber = this.userForm.get('mobileNumber');
    this.operatorName = this.userForm.get('operatorName');
    this.userType = this.userForm.get('userType');
    this.transactionCount = this.userForm.get('transactionCount');
    this.rolePermissionCount = this.userForm.get('rolePermissionCount');
    this.createdUserName = this.userForm.get('createdUserName');
    this.isActive = this.userForm.get('isActive');
    this.createdDateAndTime = this.userForm.get('createdDateAndTime');
    this.updatedDateAndTime = this.userForm.get('updatedDateAndTime');
    this.description = this.userForm.get('description');
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    this.submitting = true;

    this.userForm.patchValue({
      createdDateAndTime: this.getNowString(),
      updatedDateAndTime: '',
    });

    const userData: Partial<User> = this.userForm.value;
    console.log(userData);

    this.userService
      .createUser(userData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          console.log('User created successfully', response);
          this.showSuccessMessage('User created successfully!');
          this.resetForm();
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error creating user', error);
          this.showErrorMessage('Failed to create user. Please try again.');
        },
      });
  }

  cancel(): void {
    if (this.userForm.dirty) {
      if (
        confirm('You have unsaved changes. Are you sure you want to cancel?')
      ) {
        this.router.navigate(['/users']);
      }
    } else {
      this.router.navigate(['/users']);
    }
  }

  resetForm(): void {
    this.userForm.reset({
      userType: '',
      isActive: true,
      transactionCount: 1,
      rolePermissionCount: 0,
      createdDateAndTime: this.getNowString(),
      updatedDateAndTime: '',
    });
  }

  private getNowString(): string {
    return new Date().toLocaleString();
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Get error messages for display
  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);

    if (control?.hasError('required')) {
      return `${this.getFieldLabel(controlName)} is required`;
    }

    if (control?.hasError('minlength')) {
      const minLength = control.errors?.['minlength'].requiredLength;
      return `${this.getFieldLabel(controlName)} must be at least ${minLength} characters`;
    }

    if (control?.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength'].requiredLength;
      return `${this.getFieldLabel(controlName)} cannot exceed ${maxLength} characters`;
    }

    if (control?.hasError('pattern') && controlName === 'mobileNumber') {
      return 'Please enter a valid mobile number (10-11 digits)';
    }

    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      userName: 'User Name',
      password: 'Password',
      companyName: 'Company Name',
      departmentName: 'Department',
      designation: 'Designation',
      mobileNumber: 'Mobile Number',
      operatorName: 'Operator Name',
      userType: 'User Type',
      transactionCount: 'Transaction Count',
      rolePermissionCount: 'Role Permission Count',
      createdUserName: 'Created By',
      isActive: 'Active',
      description: 'Description',
    };
    return labels[fieldName] || fieldName;
  }

  private showSuccessMessage(message: string): void {
    console.log('Success:', message);
    // Example: this.notificationService.success(message);
  }

  private showErrorMessage(message: string): void {
    console.error('Error:', message);
    // Example: this.notificationService.error(message);
  }
}
