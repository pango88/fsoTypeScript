import React from 'react';
import { HospitalEntry } from '../../types';

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return <div>{entry.type}</div>;
};

export default HospitalDetails;
