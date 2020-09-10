import express from 'express';
import paitentService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(paitentService.getPatients());
});

export default router;
