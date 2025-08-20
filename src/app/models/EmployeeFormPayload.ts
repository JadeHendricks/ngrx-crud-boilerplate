export type Gender = 'Male' | 'Female';

export interface EmployeePayload {
  employeeId: number;
  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfJoining: string;
  departmentId: 0 | 1 | 2;
  designationId: 0 | 1 | 2;
  employeeType: string;
  salary: number;
}