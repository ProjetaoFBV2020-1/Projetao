import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../../hooks/toast';
import { Container, OrderDiv, Content, Item } from './styles';

import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';

interface Order {
  id_order: string;
  id_company: string;
  customer_id: string;
  description: string;
  status: number;
  total_value: number;
}

const DashboardCompany: React.FC = () => {
  const { addToast } = useToast();
  const [orderList, setOrderList] = useState<Order[]>([] as Order[]);

  const refresh = useCallback(() => {
    api.get<Order[]>(`/ordersCompany`).then((response) => {
      setOrderList(response.data);
    });
  }, []);

  const handleAcceptOrder = useCallback((order: Order) => {
    const data = {
      id_company: order.id_company,
      id_order: order.id_order,
      status: 2,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status modificado com sucesso.',
        });
        refresh();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao modificar o status do pedido',
        });
      }
    });
  }, []);

  const handleFinishOrder = useCallback((order: Order) => {
    const data = {
      id_company: order.id_company,
      id_order: order.id_order,
      status: 4,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status modificado com sucesso.',
        });
        refresh();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao modificar o status do pedido',
        });
      }
    });
  }, []);

  const handleAlterOrder = useCallback((order: Order) => {
    const data = {
      id_company: order.id_company,
      id_order: order.id_order,
      status: 2,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status modificado com sucesso.',
        });
        refresh();
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao modificar o status do pedido',
        });
      }
    });
  }, []);

  useEffect(() => {
    api.get<Order[]>(`/ordersCompany`).then((response) => {
      console.log(response.data);
      setOrderList(response.data);
      setInterval(refresh, 1000);
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
              {orderList.map(
                (order) =>
                  order.status == 1 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: ' + order.total_value}</strong>
                        <Button onClick={() => handleAcceptOrder(order)}>
                          Aceitar pedido
                        </Button>
                      </div>
                    </Item>
                  ),
              )}
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos ativos</h1>
            </div>
            <div>
              {orderList.map(
                (order) =>
                  order.status == 2 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: ' + order.total_value}</strong>
                        <Button onClick={() => handleFinishOrder(order)}>
                          Concluir pedido
                        </Button>
                      </div>
                    </Item>
                  ),
              )}
            </div>
          </OrderDiv>
        </Content>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos de alteração</h1>
            </div>
            <div>
              {orderList.map(
                (order) =>
                  order.status == 3 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: ' + order.total_value}</strong>
                        <Button onClick={() => handleAlterOrder(order)}>
                          Aceitar alterações
                        </Button>
                      </div>
                    </Item>
                  ),
              )}
            </div>
          </OrderDiv>
        </Content>
      </Container>
    </>
  );
};

export default DashboardCompany;
