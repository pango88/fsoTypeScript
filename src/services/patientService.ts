import patientData from '../../data/patients';
import { generateId } from '../utils';

import { PatientNoSsn, Patient, NewPatient } from '../types';

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
    ...patient,
  };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, getPatientById };
