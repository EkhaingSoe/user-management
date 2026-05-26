import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashbackConfigurationListComponent } from './pages/cashback-configuration-list/cashback-configuration-list.component';
import { CashbackToMainBalanceComponent } from './pages/cashback-to-main-balance/cashback-to-main-balance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cashback-configuration-list',
    pathMatch: 'full',
  },
  {
    path: 'cashback-configuration-list',
    component: CashbackConfigurationListComponent,
  },
  {
    path: 'cashback-to-main-balance',
    component: CashbackToMainBalanceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
