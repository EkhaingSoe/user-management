import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { DepartmentService } from '../../department.service';
import { Department } from '../../../../models/department';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css'],
})
export class DepartmentEditComponent implements OnInit, OnDestroy {
  departmentForm!: FormGroup;
  submitting = false;
  loading = false;
  private destroy$ = new Subject<void>();
  private departmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (!this.departmentId) {
      this.router.navigate(['/departments']);
      return;
    }

    this.loadDepartment(this.departmentId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.departmentForm = this.fb.group({
      departmentName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    });
  }

  private loadDepartment(id: string): void {
    this.loading = true;
    this.departmentService.getDepartmentById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (department: Department) => {
          this.departmentForm.patchValue({
            departmentName: department.departmentName,
            description: department.description,
          });
        },
        error: (err) => {
          console.error('Failed to load department', err);
          this.router.navigate(['/departments']);
        },
      });
  }

  onSubmit(): void {
    if (this.departmentForm.invalid || !this.departmentId) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const departmentData: Partial<Department> = this.departmentForm.value;

    this.departmentService.updateDepartment(this.departmentId, departmentData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/departments']);
        },
        error: (err) => {
          console.error('Update department failed', err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/departments']);
  }
}
