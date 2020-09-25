import React from 'react';
import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, setPatient } from '../state';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import EntryDetails from './EntryDetails';

const IndividualPatient: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

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
      <EntryDetails entries={singlePatient.entries} />
    </div>
  );
};

export default IndividualPatient;
