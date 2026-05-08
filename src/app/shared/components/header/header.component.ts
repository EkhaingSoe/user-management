// src/app/shared/components/header/header.component.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() toggleMobileMenu = new EventEmitter<void>();

  currentPageTitle = 'Dashboard';
  isUserDropdownOpen = false;

  menuItems = [
    { path: '/users', label: 'Users' },
    { path: '/companies', label: 'Companies' },
    { path: '/departments', label: 'Departments' },
    { path: '/designations', label: 'Designations' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  private updatePageTitle(): void {
    const currentRoute = this.router.url;
    const menuItem = this.menuItems.find((item) =>
      currentRoute.includes(item.path),
    );
    this.currentPageTitle = menuItem ? menuItem.label : 'Dashboard';
  }

  onMenuToggle(): void {
    this.toggleMobileMenu.emit();
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  logout(): void {
    console.log('Logout clicked');
    this.isUserDropdownOpen = false;
  }

  // Close dropdown when clicking outside (optional)
  closeDropdown(): void {
    this.isUserDropdownOpen = false;
  }
}
