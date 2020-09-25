import React from 'react';
import { OccupationalHealthcareEntry } from '../../types';

const OccupationalHealthcareDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return <div>{entry.type}</div>;
};

export default OccupationalHealthcareDetails;
