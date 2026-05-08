// src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isMobileSidebarOpen = false;

  menuItems = [
    { path: '/users', label: 'Users', icon: '👥', exact: false },
    { path: '/companies', label: 'Companies', icon: '🏢', exact: false },
    { path: '/departments', label: 'Departments', icon: '📁', exact: false },
    { path: '/designations', label: 'Designations', icon: '🎖️', exact: false },
  ];

  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen = !this.isMobileSidebarOpen;
  }

  closeMobileSidebar(): void {
    this.isMobileSidebarOpen = false;
  }
}
