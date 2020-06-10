import React, { useEffect } from 'react';

import { Container } from './styles';
import { useParams } from 'react-router-dom';
import Header from '../../../components/Header';

const ResetPassword: React.FC = () => {
  const { token } = useParams();

  useEffect(() => {
    console.log(token);
  });
  return (
    <>
      <Header />
      <Container>
        <h1></h1>
      </Container>
    </>
  );
};

export default ResetPassword;
