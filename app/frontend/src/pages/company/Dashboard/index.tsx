import React from 'react';

import { Container, OrderDiv, Content } from './styles';

import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';

const DashboardCompany: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos Pendentes</h1>
            </div>
            <div>
              <h3>prato 3</h3>
              <Button>Aceitar</Button>
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos ativos</h1>
            </div>
            <div>
              <h3>prato 3</h3>
              <Button>Concluir</Button>
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos de alteração</h1>
            </div>
            <div>
              <h3>prato 3</h3>
              <Button>Aceitar</Button>
            </div>
          </OrderDiv>
        </Content>
      </Container>
    </>
  );
};

export default DashboardCompany;
