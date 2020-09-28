import patientData from '../../data/patients';
import { generateId } from '../utils';

import { PatientNoSsn, Patient, NewPatient, NewEntry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): PatientNoSsn[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

const getPatientById = (id: string): (Patient | null)[] => {
  const patient = patients.filter((p) => p.id === id);
  return patient;
};

const addPatient = (patient: NewPatient): PatientNoSsn => {
  const newPatient = {
    id: generateId(),
    // temporary fix
    entries: [],
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

/// temporary
/************/
// TAR EN PAUS HÄR, NUVARANDE PROBLEM: patients.splice, uppdaterar inte min data. Något problem med types, fattar ej. Utils.ts har problem med isType hospital, health och occupational parsing. Sen bör koden fungera, men den är völdigt verbose och inte jätte fin. Fan gillar in TS just nu
/***********/
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addEntry = (id: string, entry: NewEntry) => {
  const patient: Patient[] = patients.filter((p) => p.id === id);
  const updatedPatient = {
    ...patient[0],
    entries: [...patient, { id: generateId(), ...entry }],
  };
  patients.map((p, i) =>
    p.id === id ? patients.splice(i, 1, updatedPatient) : p
  );
  patients.splice(1, 1, updatedPatient);
  return updatedPatient;
};

export default { getPatients, addPatient, getPatientById, addEntry };
