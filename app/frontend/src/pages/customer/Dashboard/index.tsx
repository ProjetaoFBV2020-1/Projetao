import React, { useState, useEffect } from 'react';

import { Container, Content, Schedule, Grid } from './styles';
import Header from '../../../components/Header';

import api from '../../../services/api';

interface Companie {
  cnpj: string;
  company_name: string;
  id_company: string;
  trade_name: string;
}

const Dashboard: React.FC = () => {
  const [companiesList, setCompaniesList] = useState<Companie[]>(
    [] as Companie[],
  );

  useEffect(() => {
    api.get<Companie[]>('/companies').then((response) => {
      setCompaniesList(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Schedule>
          <h1>Dale boy</h1>
          <p>
            <span>Hoje</span>
            <span>dia 06</span>
            <span>Segunda-feira</span>
          </p>
        </Schedule>
        <Grid>
          {companiesList.map((companie) => (
            <div>
              <img
                src="https://avatars2.githubusercontent.com/u/55264885?s=460&u=9935b27a5aec8201acbd5cf9af80728d3dd728ba&v=4"
                alt={companie.id_company}
              />
              <strong>{companie.company_name}</strong>
            </div>
          ))}
        </Grid>
      </Content>
    </Container>
  );
};

export default Dashboard;
