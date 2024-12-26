export type UserRole = 'customer' | 'admin' | 'sales_rep';

export interface Address {
  id: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface Company {
  id: string;
  name: string;
  vatNumber?: string;
  registrationNumber?: string;
  industry?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  company?: Company;
  addresses: Address[];
  phoneNumber?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isEmailVerified: boolean;
  preferences: UserPreferences;
  salesRepId?: string;
}

export interface UserPreferences {
  newsletter: boolean;
  marketingEmails: boolean;
  orderNotifications: boolean;
  language: string;
  currency: string;
}