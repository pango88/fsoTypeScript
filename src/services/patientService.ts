import patientData from '../../data/patients';
import { generateId } from '../utils';

import { PatientNoSsn, Patient, NewPatient, Entry } from '../types';

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


// high order function ... patient => patient.id === id ? updatedPatientWithNewEntry : patient
// const patient = patients.filter((p) => p.id === id);
/* const updatedPatientWithNewEntry = {
  ...patient
  entries: ...patient.entries, entry
} */
const addEntry = (id: string, entry: Entry) => {};

export default { getPatients, addPatient, getPatientById, addEntry };
