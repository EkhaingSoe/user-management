import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  TableAction,
  TableColumn,
} from '../../../../shared/components/data-table/data-table.component';
import { Company } from '../../../../models/company';
import { finalize, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { CompanyService } from '../../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  loading = false;

  showDeleteModal = false;
  companyToDelete: Company | null = null;

  columns: TableColumn[] = [
    {
      key: 'companyName',
      label: 'Company Name',
      type: 'text',
      sortable: true,
    },
    {
      key: 'description',
      label: 'Description',
      type: 'text',
      sortable: true,
    },
    {
      key: 'remark',
      label: 'Remark',
      type: 'text',
      sortable: true,
    },
    {
      key: 'isActive',
      label: 'Status',
      type: 'status',
      sortable: true,
    },
    {
      key: 'createdAt',
      label: 'Created Date',
      type: 'date',
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
    private companyService: CompanyService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCompanies();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCompanies(): void {
    this.loading = true;

    this.companyService
      .getAllCompanies()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (response: Company[]) => {
          this.companies = response;
          console.log('Companies fetched successfully:', this.companies);
        },
        error: (err) => {
          console.error('API Error:', err);

          // fallback mock data
          this.companies = this.getMockData();
        },
      });
  }

  onTableAction(event: { action: string; row: Company }): void {
    switch (event.action) {
      case 'view':
        this.router.navigate(['/companies', event.row.id]);
        break;

      case 'edit':
        if (!event.row.id) {
          console.warn('Cannot edit company without an ID');
          return;
        }
        this.router.navigate(['/companies/edit', event.row.id]);
        break;

      case 'delete':
        this.confirmDelete(event.row);
        break;
    }
  }

  confirmDelete(company: Company): void {
    this.companyToDelete = company;
    this.showDeleteModal = true;
  }

  deleteCompany(): void {
    if (!this.companyToDelete?.id) return;

    this.companyService
      .deleteCompany(this.companyToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.companies = this.companies.filter(
            (c) => c.id !== this.companyToDelete?.id,
          );

          this.closeDeleteModal();
        },

        error: (err) => {
          console.error('Delete Error:', err);

          // fallback local delete
          this.companies = this.companies.filter(
            (c) => c.id !== this.companyToDelete?.id,
          );

          this.closeDeleteModal();
        },
      });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.companyToDelete = null;
  }

  createCompany(): void {
    this.router.navigate(['/companies/create']);
  }

  getCompanyInitial(name: string): string {
    return name?.charAt(0)?.toUpperCase() || '';
  }

  private getMockData(): Company[] {
    return [
      {
        id: '1',
        companyName: 'Toto Work Co., Ltd.',
        description: 'IT Solutions & Software Development Service Provider.',
        remark: 'Main office located in Yangon.',
        isActive: true,
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-04-20T14:30:00Z',
      },
      {
        id: '2',
        companyName: 'Green Tech Myanmar',
        description: 'Digital Transformation and Cloud Consulting Services.',
        remark: 'Potential client for long-term project.',
        isActive: true,
        createdAt: '2026-02-10T10:00:00Z',
        updatedAt: '2026-05-01T11:20:00Z',
      },
    ];
  }

}
