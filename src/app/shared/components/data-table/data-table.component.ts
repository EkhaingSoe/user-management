// src/app/shared/components/data-table/data-table.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
} from '@angular/core';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'status' | 'date' | 'number' | 'custom';
  sortable?: boolean;
  width?: string;
  className?: string;
}

export interface TableAction {
  label: string;
  class: string;
  action: 'view' | 'edit' | 'delete';
}

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() actions: TableAction[] = [];
  @Input() loading = false;
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() pageSize = 10;
  @Input() searchPlaceholder = 'Search...';

  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();

  @ContentChild('customCell') customCellTemplate?: TemplateRef<any>;

  searchTerm = '';
  currentPage = 1;
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get paginatedData(): any[] {
    let filtered = this.filteredData;

    if (this.sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[this.sortColumn];
        const bVal = b[this.sortColumn];
        const modifier = this.sortDirection === 'asc' ? 1 : -1;

        if (aVal > bVal) return modifier;
        if (aVal < bVal) return -modifier;
        return 0;
      });
    }

    if (!this.showPagination) return filtered;

    const start = (this.currentPage - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  get filteredData(): any[] {
    if (!this.searchTerm) return this.data;
    return this.data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(this.searchTerm.toLowerCase()),
      ),
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalItems ? this.totalItems : end;
  }

  onSearch(): void {
    this.currentPage = 1;
    this.searchChange.emit(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.onSearch();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  onAction(action: string, row: any): void {
    this.actionClick.emit({ action, row });
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  getBadgeClass(value: string): string {
    const badgeMap: { [key: string]: string } = {
      'super admin': 'bg-amber-100 text-amber-800',
      admin: 'bg-blue-100 text-blue-800',
      user: 'bg-green-100 text-green-800',
    };
    return badgeMap[String(value).toLowerCase()] || 'bg-gray-100 text-gray-800';
  }

  getNumberClass(value: number, key: string): string {
    if (key === 'transactionCount' || key === 'transactioncount') {
      return 'bg-cyan-100 text-cyan-800';
    }
    if (key === 'rolePermissionCount' || key === 'rolepermissioncount') {
      return 'bg-purple-100 text-purple-800';
    }
    return 'bg-gray-100 text-gray-800';
  }

}
