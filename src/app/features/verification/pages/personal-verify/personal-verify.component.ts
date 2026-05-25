import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface VerificationData {
  agentID: string;
  userName: string;
  phoneNumber: string;
  agentType: string;
  regType: string;
  profilePic: string;
  dob: string;
  passportExpiryDate: string;
  idProofNumber: string;
  fatherName: string;
  passportCountry: string;
  nrcImage1: string;
  nrcImage2: string;
  businessImage1: string;
  businessImage2: string;
  businessImage3: string;
  businessImage4: string;
  approvalStatus: number;
  businessName: string;
  businessCategory: string;
  businessSubCategory: string;
  logoImage1: string;
  logoImage2: string;
  logoImage3: string;
  logoImage4: string;
  logoImage5: string;
  logoApproveStatus: number;
}

@Component({
  selector: 'app-personal-verify',
  templateUrl: './personal-verify.component.html',
  styleUrls: ['./personal-verify.component.css'],
})
export class PersonalVerifyComponent {
  searchForm: FormGroup;
  verificationData: VerificationData | null = null;
  isLoading = false;

  // Image arrays
  nrcImages: string[] = [];
  businessImages: string[] = [];
  logoImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    // Initialize form with FormBuilder
    this.searchForm = this.fb.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
    });
  }

  // Getter for easy access to form controls
  get phoneNumberControl() {
    return this.searchForm.get('phoneNumber');
  }

  // Step 1 & 4: Search user by phone
  searchUser(): void {
    if (this.searchForm.invalid) {
      this.snackBar.open('Please enter a valid phone number', 'Close', {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;
    const payload = {
      phoneNumber: this.phoneNumberControl?.value,
      action: "search",
    };

    this.http
      .post<any>(
        'https://testkycpanelapi.okdollar.org/api/Report/PersonalVerify',
        payload,
      )
      .subscribe({
        next: (response) => {
          if (response.code === 200) {
            this.verificationData = response.data;
            this.organizeImages();
            this.snackBar.open('User found successfully!', 'Close', {
              duration: 2000,
            });
          } else {
            this.snackBar.open(response.message || 'User not found', 'Close', {
              duration: 3000,
            });
            this.verificationData = null;
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Search error:', error);
          this.snackBar.open(
            'Error searching user. Please try again.',
            'Close',
            { duration: 3000 },
          );
          this.isLoading = false;
          this.verificationData = null;
        },
      });
  }

  // Organize images from response
  organizeImages(): void {
    // this.nrcImages = [
    //   this.verificationData?.nrcImage1,
    //   this.verificationData?.nrcImage2,
    // ].filter((img) => img && img.trim() !== '');

    // this.businessImages = [
    //   this.verificationData?.businessImage1,
    //   this.verificationData?.businessImage2,
    //   this.verificationData?.businessImage3,
    //   this.verificationData?.businessImage4,
    // ].filter((img) => img && img.trim() !== '');

    // this.logoImages = [
    //   this.verificationData?.logoImage1,
    //   this.verificationData?.logoImage2,
    //   this.verificationData?.logoImage3,
    //   this.verificationData?.logoImage4,
    //   this.verificationData?.logoImage5,
    // ].filter((img) => img && img.trim() !== '');
  }

  // Get current status text
  getCurrentStatus(): string {
    if (!this.verificationData) return '';
    switch (this.verificationData.approvalStatus) {
      case 0:
        return 'Rejected';
      case 1:
        return 'Approved';
      case 2:
        return 'Search';
      case 3:
        return 'Incompleted';
      default:
        return 'Unknown';
    }
  }

  // Step 3: Update status with alert and immediate UI update
  updateStatus(status: string): void {
    if (!this.verificationData) return;

    let actionCode: number;
    let statusText: string;

    switch (status) {
      case 'approved':
        actionCode = 1;
        statusText = 'Approved';
        break;
      case 'rejected':
        actionCode = 0;
        statusText = 'Rejected';
        break;
      default:
        actionCode = 3;
        statusText = 'Incompleted';
    }

    const payload = {
      phoneNumber: this.verificationData.phoneNumber,
      action: statusText,
    };

    this.isLoading = true;

    this.http
      .post<any>(
        'https://testkycpanelapi.okdollar.org/api/Report/PersonalVerify',
        payload,
      )
      .subscribe({
        next: (response) => {
          if (response.code === 200) {
            alert(`Status updated successfully to ${statusText}!`);
            this.snackBar.open(`Status updated to ${statusText}`, 'Close', {
              duration: 3000,
            });

            this.verificationData = null;
            this.nrcImages = [];
            this.businessImages = [];
            this.logoImages = [];
            this.searchForm.markAsUntouched();
            this.searchForm.markAsPristine();
          } else {
            this.snackBar.open(response.message || 'Failed to update status', 'Close', {
              duration: 3000,
            });
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Update error:', error);
          this.snackBar.open('Error updating status. Please try again.', 'Close', {
            duration: 3000,
          });
          this.isLoading = false;
        },
      });
  }

  // Check if button should be disabled
  isButtonDisabled(statusValue: number): boolean {
    return this.verificationData?.approvalStatus === statusValue;
  }

  // Open image in new tab
  openImage(imageUrl: string): void {
    window.open(imageUrl, '_blank');
  }

  // Clear form and reset
  resetForm(): void {
    this.searchForm.reset();
    this.verificationData = null;
    this.nrcImages = [];
    this.businessImages = [];
    this.logoImages = [];
  }
}
