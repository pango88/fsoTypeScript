export enum Gender {
  Male = 'male',
  Female = 'female',
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientNoSsn = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;
