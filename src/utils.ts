/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewPatient,
  Gender,
  NewEntry,
  NewHospitalEntry,
  EntryType,
  NewHealthEntry,
  HealthCheckRating,
  NewOccupationalEntry,
} from './types';

const isString = (text: any): text is string =>
  typeof text === 'string' || text instanceof String;

const parseInformation = (information: any): string => {
  if (!information || !isString(information)) {
    throw new Error(`Incorrect or missing information: ${information}`);
  }
  return information;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isGender = (param: any): param is Gender =>
  Object.values(Gender).includes(param);

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => ({
  name: parseInformation(object.name),
  dateOfBirth: parseDate(object.dateOfBirth),
  ssn: parseInformation(object.ssn),
  gender: parseGender(object.gender),
  occupation: parseInformation(object.occupation),
});

// Idk dude, messy code, could clean it up but atleast it works
export const isEntryType = (param: any): param is EntryType =>
  Object.values(EntryType).includes(param);

/*const isHospital = (param: any): param is EntryType.Hospital =>
  Object.values(EntryType.Hospital).includes(param);
const parseHospital = (type: any): EntryType.Hospital => {
  if (!type || !isHospital(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
}; */

const isHealthCheck = (param: any): param is EntryType.HealthCheck =>
  Object.values(EntryType.HealthCheck).includes(param);
const parseHealthCheck = (type: any): EntryType.HealthCheck => {
  if (!type || !isHealthCheck(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating =>
  Object.values(HealthCheckRating).includes(param);

const parseHealthCheckRating = (rating: any): HealthCheckRating => {
  if (!rating || !isHealthCheckRating(rating)) {
    throw new Error(`incorrect or missing rating: ${rating}`);
  }
  return rating;
};

const isOccupational = (
  param: any
): param is EntryType.OccupationalHealthcare =>
  Object.values(EntryType.OccupationalHealthcare).includes(param);
const parseOccupational = (type: any): EntryType.OccupationalHealthcare => {
  if (!type || !isOccupational(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

export const toBaseEntry = (object: any): NewEntry => ({
  description: parseInformation(object.description),
  date: parseDate(object.date),
  specialist: parseInformation(object.specialist),
});

export const toHospitalEntry = (object: any): NewHospitalEntry => ({
  ...toBaseEntry(object),
  type: object.type,
  // this one might be weird
  discharge: {
    date: parseDate(object.discharge.date),
    criteria: parseInformation(object.discharge.criteria),
  },
});

export const toHealthEntry = (object: any): NewHealthEntry => ({
  ...toBaseEntry(object),
  type: parseHealthCheck(object.type),
  healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
});

export const toOccupationalEntry = (object: any): NewOccupationalEntry => ({
  ...toBaseEntry(object),
  type: parseOccupational(object.type),
  employerName: parseInformation(object.employerName),
  // this one might be weird
  sickLeave: {
    startDate: parseDate(object.sickLeave.startDate),
    endDate: parseDate(object.sickLeave.endDate),
  },
});

/****************/

export const generateId = (): string =>
  String(Number((Math.random() * 1000000).toFixed(0)));
