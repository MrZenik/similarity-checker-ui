import { FormGroup } from '@angular/forms';

export function passwordMatchValidatorOnCreate(g: FormGroup) {
  return g.get('password')?.value === g.get('passwordRepeat')?.value ? null : {'passwordMismatch': true};
}

export function passwordMatchValidatorOnUpdate(g: FormGroup) {
  return g.get('newPassword')?.value === g.get('newPasswordRepeat')?.value ? null : {'passwordMismatch': true};
}

