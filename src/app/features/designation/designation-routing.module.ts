import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesignationListComponent } from './pages/designation-list/designation-list.component';
import { DesignationCreateComponent } from './pages/designation-create/designation-create.component';
import { DesignationEditComponent } from './pages/designation-edit/designation-edit.component';

const routes: Routes = [
  {
    path: '',
    component: DesignationListComponent,
  },
  {
    path: 'create',
    component: DesignationCreateComponent,
  },
  {
    path: 'edit/:id',
    component: DesignationEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
