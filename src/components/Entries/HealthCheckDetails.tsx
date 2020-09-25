import React from 'react';
import { HealthCheckEntry } from '../../types';

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return <div>{entry.type}</div>;
};

export default HealthCheckDetails;
