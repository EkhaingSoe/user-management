export interface User {
  id?: string;
  userName: string;
  departmentName: string;
  companyName: string;
  designation: string;
  mobileNumber: string;
  operatorName: string;
  userType: 'Admin' | 'Super Admin' | 'User';
  transactionCount: number;
  rolePermissionCount: number;
  description: string;
  createdUserName: string;
  isActive: boolean;
  createdDateAndTime?: string;
  updatedDateAndTime?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
