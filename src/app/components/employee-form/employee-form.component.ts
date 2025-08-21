import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeePayload, FullEmployeePayload, Gender } from '../../models/EmployeeFormPayload';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {

  private formBuilder = inject(FormBuilder);
  public submittedPayload: EmployeePayload | null = null;

  public form = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(5)]],
    gender: ['Male' as Gender, [Validators.required, Validators.pattern(/^(Male|Female)$/)]],
    dateOfJoining: [''], // optional; will default to today if blank
    departmentId: [1 as 1 | 2, [Validators.required]],
    designationId: [1 as 1 | 2, [Validators.required]],
    employeeType: ['', [Validators.required, Validators.minLength(2)]],
    salary: [0, [Validators.required, Validators.min(0)]],
  });
  
  private buildPayload(formValues: EmployeePayload): FullEmployeePayload {
    return {
      employeeId: Date.now(),
      fullName: formValues.fullName!,
      email: formValues.email!,
      phone: formValues.phone!,
      gender: (formValues.gender as Gender) ?? 'Male',
      dateOfJoining: new Date().toISOString(),
      departmentId: (Number(formValues.departmentId) as 1 | 2) ?? 1,
      designationId: (Number(formValues.designationId) as 1 | 2) ?? 1,
      employeeType: formValues.employeeType!,
      salary: Number(formValues.salary ?? 0),
    }
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValues = this.form.getRawValue() as EmployeePayload;
    this.submittedPayload  = this.buildPayload(formValues)

    console.log('POST this payload to API:', this.submittedPayload);
  }
}
