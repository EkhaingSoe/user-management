import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { DesignationService } from '../../designation.service';
import { Designation } from '../../../../models/designation';

@Component({
  selector: 'app-designation-create',
  templateUrl: './designation-create.component.html',
  styleUrls: ['./designation-create.component.css'],
})
export class DesignationCreateComponent implements OnInit, OnDestroy {
  designationForm!: FormGroup;
  submitting = false;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private designationService: DesignationService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.designationForm = this.fb.group({
      designationName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    });
  }

  onSubmit(): void {
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const designationData: Partial<Designation> = this.designationForm.value;

    this.designationService.createDesignation(designationData)
      .pipe(
        finalize(() => (this.submitting = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => this.router.navigate(['/designations']),
        error: (err) => {
          console.error('Create designation failed', err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/designations']);
  }
}
