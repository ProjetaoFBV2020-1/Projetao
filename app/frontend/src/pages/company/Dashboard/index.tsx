import React from 'react';

import { Container } from './styles';

import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';

const DashboardCompany: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <h1>DashboardCompany</h1>
      </Container>
    </>
  );
};

export default DashboardCompany;
