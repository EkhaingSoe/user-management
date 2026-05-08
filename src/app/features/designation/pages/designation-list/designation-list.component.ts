import { Component } from '@angular/core';
import { Designation } from '../../../../models/designation';
import { TableAction, TableColumn } from '../../../../shared/components/data-table/data-table.component';
import { finalize, Subject, takeUntil } from 'rxjs';
import { DesignationService } from '../../designation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrl: './designation-list.component.css',
})
export class DesignationListComponent {
  designations: Designation[] = [];
  loading = false;

  showDeleteModal = false;
  designationToDelete: Designation | null = null;

  columns: TableColumn[] = [
    {
      key: 'designationName',
      label: 'Designation Name',
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
      key: 'createdAt',
      label: 'Created Date',
      type: 'date',
      sortable: true,
    },
  ];

  actions: TableAction[] = [
    {
      label: 'Edit',
      class: 'text-blue-600 hover:text-blue-800',
      action: 'edit',
    },
    {
      label: 'Delete',
      class: 'text-red-600 hover:text-red-800',
      action: 'delete',
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private designationService: DesignationService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDesignations();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDesignations(): void {
    this.loading = true;

    this.designationService
      .getAllDesignations()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false)),
      )
      .subscribe({
        next: (response: Designation[]) => {
          this.designations = response;
          console.log('Designations fetched successfully:', this.designations);
        },
        error: (err) => {
          console.error('API Error:', err);

          // fallback mock data
          this.designations = this.getMockData();
        },
      });
  }

  onAction(event: { action: string; row: Designation }): void {
    switch (event.action) {
      case 'edit':
        if (!event.row.id) {
          console.warn('Cannot edit designation without an ID');
          return;
        }
        this.router.navigate(['/designations/edit', event.row.id]);
        break;

      case 'delete':
        this.confirmDelete(event.row);
        break;
    }
  }

  confirmDelete(designation: Designation): void {
    this.designationToDelete = designation;
    this.showDeleteModal = true;
  }

  deleteDesignation(): void {
    if (!this.designationToDelete?.id) return;

    this.designationService
      .deleteDesignation(this.designationToDelete.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.designations = this.designations.filter(
            (d) => d.id !== this.designationToDelete?.id,
          );

          this.closeDeleteModal();
        },

        error: (err) => {
          console.error('Delete Error:', err);

          // fallback local delete
          this.designations = this.designations.filter(
            (d) => d.id !== this.designationToDelete?.id,
          );

          this.closeDeleteModal();
        },
      });
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.designationToDelete = null;
  }

  onCreate(): void {
    this.router.navigate(['/designations/create']);
  }

  private getMockData(): Designation[] {
    return [
      {
        id: '1',
        designationName: 'Senior Software Engineer',
        description:
          'Leads development of core product modules and mentors junior engineers.',
        createdAt: '2026-01-15T09:00:00Z',
        updatedAt: '2026-04-20T14:30:00Z',
      },
      {
        id: '2',
        designationName: 'Product Manager',
        description:
          'Coordinates product planning, stakeholder communication, and delivery timelines.',
        createdAt: '2026-02-10T10:00:00Z',
        updatedAt: '2026-05-01T11:20:00Z',
      },
    ];
  }
}
