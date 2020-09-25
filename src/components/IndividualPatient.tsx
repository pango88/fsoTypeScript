import React from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, setPatient } from '../state';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const IndividualPatient: React.FC = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  const singlePatient = Object.values(patient).filter((p) => p.id === id)[0];

  const fetchPatient = async () => {
    try {
      const { data: patientFromId } = await axios.get<Patient[]>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(setPatient(patientFromId));
    } catch (e) {
      console.error(e);
    }
  };
  if (!singlePatient) {
    fetchPatient();
  }

  const genderIcon = () => {
    if (singlePatient.gender === 'male') {
      return <Icon name="mars" />;
    } else {
      return <Icon name="venus" />;
    }
  };

  const entries = () => {
    if (singlePatient.entries) {
      return singlePatient.entries.map((entry) => {
        return (
          <div key={entry.id}>
            {entry.date} {entry.description}
          </div>
        );
      });
    }
  };

  // Horrific piece of code, gonna look into this later. How to clean it up. Also search: map inside map, is there a cleaner and more efficent way?
  const diagnosisCodes = () => {
    if (singlePatient.entries) {
      return (
        <ul>
          {singlePatient.entries.map((entry) => {
            return entry.diagnosisCodes
              ? entry.diagnosisCodes.map((code) => (
                  <li key={code}>
                    {code} {diagnosis[code].name}
                  </li>
                ))
              : null;
          })}
        </ul>
      );
    }
  };

  if (!singlePatient) {
    return (
      <div>
        <Icon loading name="spinner" />
        <b>or the patient does not exist</b>
      </div>
    );
  }
  return (
    <div>
      <h2>
        {singlePatient.name}
        {genderIcon()}
      </h2>
      <p>ssn: {singlePatient.ssn}</p>
      <p>occupation: {singlePatient.occupation}</p>
      <h4>entries</h4>
      {entries()}
      {diagnosis ? diagnosisCodes() : null}
    </div>
  );
};

export default IndividualPatient;
