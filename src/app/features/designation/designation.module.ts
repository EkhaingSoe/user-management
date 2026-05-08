import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationListComponent } from './pages/designation-list/designation-list.component';
import { DesignationCreateComponent } from './pages/designation-create/designation-create.component';
import { DesignationEditComponent } from './pages/designation-edit/designation-edit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DesignationListComponent,
    DesignationCreateComponent,
    DesignationEditComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    DesignationRoutingModule,
  ],
})
export class DesignationModule {}
