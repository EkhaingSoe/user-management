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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
