import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { UserService } from '../../user.service';
import { User } from '../../../../models/user';

interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  submitting = false;
  loading = false;
  private destroy$ = new Subject<void>();
  private userId: string | null = null;

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

  userTypeOptions: SelectOption[] = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Super Admin', label: 'Super Admin' },
    { value: 'User', label: 'User' },
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (!this.userId) {
      this.router.navigate(['/users']);
      return;
    }

    this.initializeForm();
    this.initializeControlReferences();
    this.loadUser(this.userId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.userForm = this.fb.group({
      userName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      password: [''],
      departmentName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      ],
      designation: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,11}$')],
      ],
      companyName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      ],
      userType: ['', Validators.required],
      operatorName: [
        '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
      ],
      transactionCount: [1, [Validators.required, Validators.min(0)]],
      rolePermissionCount: [0, [Validators.required, Validators.min(0)]],
      createdUserName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      isActive: [true],
      createdDateAndTime: [this.getNowString()],
      updatedDateAndTime: [''],
      description: [
        '',
        [Validators.required, Validators.minLength(10), Validators.maxLength(500)],
      ],
    });
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

  private loadUser(id: string): void {
    this.loading = true;
    this.userService
      .getUserById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (user: User) => {
          this.userForm.patchValue({
            userName: user.userName,
            departmentName: user.departmentName,
            designation: user.designation,
            mobileNumber: user.mobileNumber,
            companyName: user.companyName,
            userType: user.userType,
            operatorName: user.operatorName,
            transactionCount: user.transactionCount,
            rolePermissionCount: user.rolePermissionCount,
            createdUserName: user.createdUserName,
            isActive: user.isActive,
            createdDateAndTime: user.createdDateAndTime || this.getNowString(),
            updatedDateAndTime: user.updatedDateAndTime || '',
            description: user.description,
          });
        },
        error: (error) => {
          console.error('Error loading user', error);
          this.router.navigate(['/users']);
        },
      });
  }

  onSubmit(): void {
    if (!this.userId || this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    this.submitting = true;

    const rawValue = this.userForm.value;
    const userData: Partial<User> = {
      ...rawValue,
      updatedDateAndTime: this.getNowString(),
    };

    if (!rawValue.password) {
      delete (userData as any).password;
    }

    this.userService
      .updateUser(this.userId, userData as User)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Error updating user', error);
        },
      });
  }

  cancel(): void {
    if (this.userForm.dirty) {
      if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        this.router.navigate(['/users']);
      }
    } else {
      this.router.navigate(['/users']);
    }
  }

  private getNowString(): string {
    return new Date().toISOString();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
