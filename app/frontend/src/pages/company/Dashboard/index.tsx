import React, { useState, useEffect, useCallback } from 'react';

import { Container, OrderDiv, Content, Item } from './styles';

import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';

interface Order {
  id_order: string;
  customer_id: string;
  description: string;
  status: number;
  total_value: number;
};


const DashboardCompany: React.FC = () => {

  const [orderList, setOrderList] = useState<Order[]>([] as Order[]);

  //handleAcceptOrder
  //handleFinishOrder
  //handleAlterarOrder

  

  useEffect(() => {
    api.get<Order[]>(`/ordersCompany`).then((response) => {
      setOrderList(response.data);
    });
  }, []);

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
              {orderList.map((order) => (
                order.status == 1 && (
                  <Item key={order.id_order}>
                  <div>
                    <strong>{"Status: " + order.status}</strong>
                    <strong>{"Descrição: " + order.description}</strong>
                    <strong>{"Valor total: " + order.total_value}</strong>
                    <Button>Aceitar pedido</Button>
                  </div>
                </Item>
                )
                ))}
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos ativos</h1>
            </div>
            <div>
            {orderList.map((order) => (
                order.status == 2 && (
                  <Item key={order.id_order}>
                  <div>
                    <strong>{"Status: " + order.status}</strong>
                    <strong>{"Descrição: " + order.description}</strong>
                    <strong>{"Valor total: " + order.total_value}</strong>
                    <Button>Aceitar pedido</Button>
                  </div>
                </Item>
                )
                ))}
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos de alteração</h1>
            </div>
            <div>
            {orderList.map((order) => (
                order.status == 3 && (
                  <Item key={order.id_order}>
                  <div>
                    <strong>{"Status: " + order.status}</strong>
                    <strong>{"Descrição: " + order.description}</strong>
                    <strong>{"Valor total: " + order.total_value}</strong>
                    <Button>Aceitar pedido</Button>
                  </div>
                </Item>
                )
                ))}
            </div>
          </OrderDiv>
        </Content>
      </Container>
    </>
  );
};

export default DashboardCompany;
