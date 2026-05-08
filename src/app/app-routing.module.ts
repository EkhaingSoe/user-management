import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./features/company/company.module').then(
        (m) => m.CompanyModule,
      ),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./features/department/department.module').then(
        (m) => m.DepartmentModule,
      ),
  },
  {
    path: 'designations',
    loadChildren: () =>
      import('./features/designation/designation.module').then(
        (m) => m.DesignationModule,
      ),
  },
  {
    path: '**',
    redirectTo: '/users',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
