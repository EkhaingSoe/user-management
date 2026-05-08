import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { DepartmentService } from '../../department.service';
import { Department } from '../../../../models/department';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit, OnDestroy {
  departments: Department[] = [];
  loading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private departmentService: DepartmentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService
      .getAllDepartments()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (departments: Department[]) => {
          this.departments = departments;
        },
        error: (err) => {
          console.error('Failed to load departments', err);
          this.departments = this.getMockData();
        },
      });
  }

  onCreate(): void {
    this.router.navigate(['/departments/create']);
  }

  onAction(event: { action: string; row: Department }): void {
    switch (event.action) {
      case 'edit':
        this.onEdit(event.row);
        break;
      case 'delete':
        this.onDelete(event.row);
        break;
    }
  }

  onEdit(department: Department): void {
    this.router.navigate(['/departments/edit', department.id]);
  }

  onDelete(department: Department): void {
    if (
      confirm(`Are you sure you want to delete "${department.departmentName}"?`)
    ) {
      this.departmentService
        .deleteDepartment(department.id!)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.loadDepartments();
          },
          error: (err) => {
            console.error('Failed to delete department', err);
          },
        });
    }
  }

  private getMockData(): Department[] {
    return [
      {
        id: '1',
        departmentName: 'Engineering',
        description:
          'Responsible for product development, architecture, and technical delivery.',
        createdAt: '2026-01-10T09:00:00Z',
        updatedAt: '2026-04-20T14:30:00Z',
      },
      {
        id: '2',
        departmentName: 'Human Resources',
        description:
          'Handles recruiting, employee relations, and benefits administration.',
        createdAt: '2026-02-05T10:30:00Z',
        updatedAt: '2026-05-01T11:20:00Z',
      },
      {
        id: '3',
        departmentName: 'Sales',
        description:
          'Drives customer acquisition, account growth, and sales strategy execution.',
        createdAt: '2026-03-12T08:15:00Z',
        updatedAt: '2026-05-05T13:45:00Z',
      },
    ];
  }
}
