import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyCreateComponent } from './pages/company-create/company-create.component';
import { CompanyEditComponent } from './pages/company-edit/company-edit.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyCreateComponent,
    CompanyEditComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
