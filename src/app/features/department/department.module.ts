import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentCreateComponent } from './pages/department-create/department-create.component';
import { DepartmentEditComponent } from './pages/department-edit/department-edit.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DepartmentRoutingModule,
    SharedModule
  ]
})
export class DepartmentModule { }
