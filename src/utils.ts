/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender } from './types';

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

export const generateId = (): string =>
  String(Number((Math.random() * 1000000).toFixed(0)));
