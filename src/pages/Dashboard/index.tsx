import React from 'react';

import DevForm from './DevForm';
import DevList from './DevList';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <DevForm />
      <DevList />
    </Container>
  );
};

export default Dashboard;
