import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalVerifyComponent } from './pages/personal-verify/personal-verify.component';
import { BusinessVerifyComponent } from './pages/business-verify/business-verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'personal',
    pathMatch: 'full',
  },
  {
    path: 'personal',
    component: PersonalVerifyComponent,
  },
  {
    path: 'business',
    component: BusinessVerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule {}
