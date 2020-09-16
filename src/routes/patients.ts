import express from 'express';
import paitentService from '../services/patientService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(paitentService.getPatients());
});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  res.send(paitentService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // not sure why this would cause an error or need typing...
    const addedPatient = paitentService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
