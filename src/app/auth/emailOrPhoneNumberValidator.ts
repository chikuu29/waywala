import { ValidatorFn, AbstractControl } from '@angular/forms';

export function emailOrPhoneNumberValidator(): ValidatorFn {
  const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberPattern = /^[0-9]{10}$/;

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (emailPattern.test(value) || phoneNumberPattern.test(value)) {
      return null; // Validation passed
    } else {
      return { invalidEmailOrPhoneNumber: true }; // Validation failed
    }
  };
}
