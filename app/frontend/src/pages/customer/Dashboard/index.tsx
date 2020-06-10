import React, { useState, useEffect } from 'react';

import { Container, Content, Schedule, Grid, StyledLink } from './styles';
import Header from '../../../components/Header';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { FiEdit } from 'react-icons/fi';
import Button from '../../../components/Button';

interface company {
  cnpj: string;
  company_name: string;
  id_company: string;
  trade_name: string;
}

const Dashboard: React.FC = () => {
  const [companysList, setcompanysList] = useState<company[]>([] as company[]);

  useEffect(() => {
    api.get<company[]>('/companies').then((response) => {
      setcompanysList(response.data);
    });
  }, []);

  return (
    <Container>
      <Header />
      

      <Content>
      <StyledLink type="button" to="/orders">
        
        <Button>Pedidos</Button>
        
      </StyledLink>
        <Schedule>
          <h1>Dale boy</h1>
          <p>
            <span>Hoje</span>
            <span>dia 06</span>
            <span>Segunda-feira</span>
          </p>
        </Schedule>
        <Grid>
          {companysList.map((company) => (
            <StyledLink
              key={company.id_company}
              to={`/delivery/${company.company_name}/${company.id_company}`}
            >
              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/39508440?s=460&v=4"
                  alt={company.id_company}
                />
                <h3>{company.trade_name}</h3>
              </div>
            </StyledLink>
          ))}
        </Grid>
      </Content>
    </Container>
  );
};

export default Dashboard;
