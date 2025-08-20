import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

type Gender = 'Male' | 'Female';

export interface EmployeePayload {
  employeeId: number;            // generated on submit (unique)
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfJoining: string;         // ISO string; set to today if left blank
  departmentId: 0 | 1 | 2;       // 1 or 2 (0 not used here)
  designationId: 0 | 1 | 2;      // 1 or 2 (0 not used here)
  employeeType: string;
  salary: number;
}

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
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

    // For showing the result below the form
  submittedPayload: EmployeePayload | null = null;

  useToday() {
    // Sets the control to today's date for the <input type="date">
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.form.controls.dateOfJoining.setValue(`${yyyy}-${mm}-${dd}`);
  }
  
  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // Pull raw values
    const v = this.form.getRawValue();

    // Resolve dateOfJoining: if blank, use now; else convert the yyyy-mm-dd to ISO
    const dateIso =
      v.dateOfJoining && v.dateOfJoining.trim() !== ''
        ? new Date(v.dateOfJoining).toISOString()
        : new Date().toISOString();

    // Generate a numeric "unique" id (simple). Replace with your backend-generated id if needed.
    const generatedId = Date.now();

    // Build the exact payload shape
    const payload: EmployeePayload = {
      employeeId: generatedId,            // can be replaced by server-side id
      fullName: v.fullName!,
      email: v.email!,
      phone: v.phone!,
      gender: (v.gender as Gender) ?? 'Male',
      dateOfJoining: dateIso,
      departmentId: (Number(v.departmentId) as 1 | 2) ?? 1,
      designationId: (Number(v.designationId) as 1 | 2) ?? 1,
      employeeType: v.employeeType!,
      salary: Number(v.salary ?? 0),
    };

    // Show it (and use this to POST to your API)
    this.submittedPayload = payload;
    console.log('POST this payload to API:', payload);

    // Example:
    // this.http.post('/api/employees', payload).subscribe(...)
  }
}
