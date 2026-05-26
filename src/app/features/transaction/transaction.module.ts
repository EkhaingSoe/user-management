import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { CashbackConfigurationListComponent } from './pages/cashback-configuration-list/cashback-configuration-list.component';
import { CashbackToMainBalanceComponent } from './pages/cashback-to-main-balance/cashback-to-main-balance.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

// Angular Material modules (install @angular/material to use them)
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@NgModule({ imports: [
    CommonModule,
    TransactionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
        MatCardModule,
        MatDividerModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonModule,
  ]
})
export class TransactionModule { }
