import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AUTH } from '../../../../core/constant/auth.constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() user: any;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  form: FormGroup;

  roles = [
    { label: 'Admin', value: AUTH.ROLES.ADMIN },
    { label: 'User', value: AUTH.ROLES.USER },
  ];

  permissions = Object.entries(AUTH.PERMISSIONS).map(([key, value]) => ({
    label: key.replace(/_/g, ' ').toLowerCase(),
    value,
  }));

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      permissions: [[]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.save.emit(this.form.value);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
