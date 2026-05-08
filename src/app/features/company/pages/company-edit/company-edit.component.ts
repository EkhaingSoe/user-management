import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { CompanyService } from '../../company.service';
import { Company } from '../../../../models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit, OnDestroy {
  companyForm!: FormGroup;
  submitting = false;
  loading = false;
  private destroy$ = new Subject<void>();
  private companyId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (!this.companyId) {
      this.router.navigate(['/companies']);
      return;
    }

    this.loadCompany(this.companyId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.companyForm = this.fb.group({
      companyName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
    });
  }

  private loadCompany(id: string): void {
    this.loading = true;
    this.companyService.getCompanyById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (company: Company) => {
          this.companyForm.patchValue({
            companyName: company.companyName,
            description: company.description,
          });
        },
        error: (err) => {
          console.error('Failed to load company', err);
          this.router.navigate(['/companies']);
        },
      });
  }

  onSubmit(): void {
    if (this.companyForm.invalid || !this.companyId) {
      this.companyForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    const companyData: Partial<Company> = this.companyForm.value;

    this.companyService.updateCompany(this.companyId, companyData)
      .pipe(
        finalize(() => {
          this.submitting = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/companies']);
        },
        error: (err) => {
          console.error('Update company failed', err);
        },
      });
  }

  cancel(): void {
    this.router.navigate(['/companies']);
  }
}
