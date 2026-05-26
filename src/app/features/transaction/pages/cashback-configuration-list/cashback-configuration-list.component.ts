import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../services/api.service';
// import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
// import { LoadingService } from '@core/service/loading.service';
// import { ApiService } from '@core/service/api.service';

export interface CashbackRecord {
  minRange: string;
  maxRange: string;
  disbType: string;
  perAmount: string;
  amount: string;
  status: string;
}

export interface CashbackData {
  agentCode: string;
  transId: string;
  resultCode: number;
  resultDescription: string;
  requestCts: string;
  responseCts: string;
  vendorCode: string;
  clientType: string;
  secureToken: string;
  recordCount: number;
  recordList: CashbackRecord[];
}

@Component({
  selector: 'app-cashback-configuration-list',
   standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
  ],
  templateUrl: './cashback-configuration-list.component.html',
  styleUrl: './cashback-configuration-list.component.css',
})
export class CashbackConfigurationListComponent {
  private service = inject(ApiService);
  private formBuilder = inject(UntypedFormBuilder);

  cashbackForm!: UntypedFormGroup;
  cashbackDataList: CashbackData[] = [];
  recordDataSource: CashbackRecord[] = [];

  displayedColumns: string[] = [
    'minRange',
    'maxRange',
    'disbType',
    'perAmount',
    'amount',
    'status',
  ];

  submitted = false;
  error = '';
  success = '';
  hidePassword = true;

  ngOnInit() {
    this.cashbackForm = this.formBuilder.group({
      agentCode: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.cashbackForm.controls;
  }

  viewCashbackConfig() {
    this.submitted = true;
    this.error = '';
    this.success = '';
    this.cashbackDataList = [];
    this.recordDataSource = [];

    if (this.cashbackForm.invalid) {
      return;
    }

    const payload = {
      AgentCode: this.cashbackForm.value.agentCode,
      Password: this.cashbackForm.value.password,
    };

    console.log("payload",payload);
    

    const url = `/api/AutoCashbackConfig/ViewCashBack`;

    this.service.post(url, payload).subscribe({
      next: (res: any) => {
        // this.loader.hide();
        if (res && res.code === 200) {
          this.success = 'Cashback details retrieved successfully!';
          if (res.data && res.data.length > 0) {
            this.cashbackDataList = res.data;
            // Target first array result's configurations mapping profile records
            this.recordDataSource = res.data[0].recordList || [];
          }
          this.submitted = false;
        } else {
          this.error =
            res?.message || 'Failed to retrieve configuration rules.';
          this.submitted = false;
        }
      },
      error: (err: any) => {
        // this.loader.hide();
        this.error =
          err?.error?.message ||
          'Error occurred communicating with secure routing gateways.';
        this.submitted = false;
      },
    });
  }
}


