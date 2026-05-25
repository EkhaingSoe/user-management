import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-business-verify',
  templateUrl: './business-verify.component.html',
  styleUrls: ['./business-verify.component.css']
})
export class BusinessVerifyComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      businessName: ['', Validators.required],
      registrationNumber: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      console.log('Business verify', this.form.value);
    }
  }
}
