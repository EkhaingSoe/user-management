import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VerificationRoutingModule } from './verification-routing.module';
import { PersonalVerifyComponent } from './pages/personal-verify/personal-verify.component';
import { BusinessVerifyComponent } from './pages/business-verify/business-verify.component';
import { SharedModule } from '../../shared/shared.module';

// Angular Material modules (install @angular/material to use them)
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PersonalVerifyComponent, BusinessVerifyComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VerificationRoutingModule,
    SharedModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class VerificationModule {}
