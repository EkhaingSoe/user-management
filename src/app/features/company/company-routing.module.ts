import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyListComponent } from './pages/company-list/company-list.component';
import { CompanyCreateComponent } from './pages/company-create/company-create.component';
import { CompanyEditComponent } from './pages/company-edit/company-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyListComponent,
  },
  {
    path: 'create',
    component: CompanyCreateComponent,
  },
  {
    path: 'edit',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'edit/:id',
    component: CompanyEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
