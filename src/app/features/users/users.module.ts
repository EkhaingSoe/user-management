// src/app/features/users/users.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersRoutingModule } from './users-routing.module';

// Components
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';
import { SharedModule } from '../../shared/shared.module';

// Shared Module
// import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserCreateComponent,
    UserEditComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UsersRoutingModule,
    SharedModule, // Make sure SharedModule is imported here
  ],
})
export class UsersModule {}
