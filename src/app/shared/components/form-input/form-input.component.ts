// src/app/shared/components/form-input/form-input.component.ts
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() type: 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea' =
    'text';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() rows = 3;
  @Input() min?: number;
  @Input() max?: number;
  @Input() pattern?: string;
  @Input() control?: AbstractControl | null;

  value: any = '';
  touched = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: any): void {
    let value = event.target.value;
    if (this.type === 'number') {
      value = value ? parseFloat(value) : null;
    }
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.touched = true;
    this.onTouched();
  }

  getErrorMessage(): string {
    if (!this.control || !this.control.errors || !this.touched) return '';

    const errors = this.control.errors;

    if (errors['required']) return `${this.label || 'This field'} is required`;
    if (errors['minlength'])
      return `${this.label || 'This field'} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors['maxlength'])
      return `${this.label || 'This field'} cannot exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors['min'])
      return `${this.label || 'This field'} must be at least ${errors['min'].min}`;
    if (errors['max'])
      return `${this.label || 'This field'} cannot exceed ${errors['max'].max}`;
    if (errors['pattern'])
      return `Invalid format for ${this.label || 'this field'}`;
    if (errors['email']) return 'Please enter a valid email address';
    if (errors['phoneNumber']) return 'Please enter a valid phone number';

    return 'Invalid input';
  }

  hasError(): boolean {
    return !!this.control && this.control.invalid && this.touched;
  }
}
