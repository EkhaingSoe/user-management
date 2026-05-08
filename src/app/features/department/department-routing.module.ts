import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './pages/department-list/department-list.component';
import { DepartmentCreateComponent } from './pages/department-create/department-create.component';
import { DepartmentEditComponent } from './pages/department-edit/department-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentListComponent,
  },
  {
    path: 'create',
    component: DepartmentCreateComponent,
  },
  {
    path: 'edit/:id',
    component: DepartmentEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
