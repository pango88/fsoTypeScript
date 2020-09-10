import patientData from '../../data/patients.json';

import { PatientNoSsn, Patient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): PatientNoSsn[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));

export default { getPatients };
