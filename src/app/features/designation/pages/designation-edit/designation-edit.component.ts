import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { DesignationService } from '../../designation.service';
import { Designation } from '../../../../models/designation';

@Component({
  selector: 'app-designation-edit',
  templateUrl: './designation-edit.component.html',
  styleUrls: ['./designation-edit.component.css'],
})
export class DesignationEditComponent implements OnInit, OnDestroy {
  designationForm!: FormGroup;
  submitting = false;
  loading = false;
  private destroy$ = new Subject<void>();
  private designationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private designationService: DesignationService,
  ) {}

  ngOnInit(): void {
    this.designationId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (!this.designationId) {
      this.router.navigate(['/designations']);
      return;
    }

    this.loadDesignation(this.designationId);
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

  private loadDesignation(id: string): void {
    this.loading = true;
    this.designationService.getDesignationById(id)
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (designation: Designation) => {
          this.designationForm.patchValue({
            designationName: designation.designationName,
            description: designation.description,
          });
        },
        error: (err) => {
          console.error('Failed to load designation', err);
          this.router.navigate(['/designations']);
        },
      });
  }

  onSubmit(): void {
    if (this.designationForm.invalid || !this.designationId) {
      this.designationForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const designationData: Partial<Designation> = this.designationForm.value;

    this.designationService.updateDesignation(this.designationId, designationData)
      .pipe(
        finalize(() => (this.submitting = false)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => this.router.navigate(['/designations']),
        error: (err) => {
          console.error('Update designation failed', err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/designations']);
  }
}
