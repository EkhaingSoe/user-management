// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import {
  LucideAngularModule,
  Home,
  Users,
  Building2,
  FolderTree,
  Briefcase,
  Shield,
  Upload,
  LogOut,
  Menu,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from 'lucide-angular';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroUsers,
  heroBuildingOffice,
  heroRectangleGroup,
} from '@ng-icons/heroicons/outline';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// Angular Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    LucideAngularModule.pick({
      Home,
      Users,
      Building2,
      FolderTree,
      Briefcase,
      Shield,
      Upload,
      LogOut,
      Menu,
      ChevronLeft,
      ChevronRight,
      ChevronDown,
    }),
    NgIconsModule.withIcons({
      heroUsers,
      heroBuildingOffice,
      heroRectangleGroup,
    }),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
