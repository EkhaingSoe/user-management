import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  path?: string;
  label: string;
  icon: string;
  exact?: boolean;
  expanded?: boolean;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closeSidebar = new EventEmitter<void>();

  isCollapsed = false;
  activeRoute = '';

  menuItems: MenuItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: '🏠',
      exact: true,
    },
    {
      label: 'User Role Master',
      icon: '👥',
      expanded: false,
      children: [
        {
          path: '/companies',
          label: 'Company',
          icon: '🏢',
        },
        {
          path: '/departments',
          label: 'Department',
          icon: '📁',
        },
        {
          path: '/designations',
          label: 'Designation',
          icon: '🎖️',
        },
      ],
    },
    {
      path: '/users',
      label: 'User Role Permission',
      icon: '🛡️',
      exact: false,
    },
    {
      path: '/upload-oks',
      label: 'Upload OKS Account Number',
      icon: '⬆️',
      exact: false,
    },
  ];

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.activeRoute = this.router.url;

        // Auto expand parent menu when child route active
        this.menuItems.forEach((item) => {
          if (item.children) {
            item.expanded = item.children.some((child) =>
              this.activeRoute.includes(child.path || ''),
            );
          }
        });
      });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  toggleMenu(item: MenuItem): void {
    item.expanded = !item.expanded;
  }

  closeMobileSidebar(): void {
    this.closeSidebar.emit();
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
