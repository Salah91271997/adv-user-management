import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VALIDATION } from '../../../../core/constant/validation.constants';
import { AuthFacade } from '../../services/auth.facade.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, public authFacade: AuthFacade) {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(VALIDATION.LENGTHS.MIN_USERNAME),
        ],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(VALIDATION.PATTERNS.PASSWORD)],
      ],
      rememberMe: [false],
    });
  }

  isFieldInvalid(field: string): boolean {
    const formControl = this.loginForm.get(field);
    return formControl ? formControl.invalid && formControl.touched : false;
  }

  getErrorMessage(field: string): string {
    const formControl = this.loginForm.get(field);
    if (formControl?.errors) {
      if (formControl.errors['required']) {
        return VALIDATION.MESSAGES.REQUIRED;
      }
      if (formControl.errors['pattern']) {
        return VALIDATION.MESSAGES.PASSWORD;
      }
      if (formControl.errors['minlength']) {
        return `Minimum length is ${VALIDATION.LENGTHS.MIN_USERNAME} characters`;
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authFacade.login(this.loginForm.value);
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
