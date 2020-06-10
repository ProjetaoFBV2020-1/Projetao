import React, { useState, useEffect, useCallback } from 'react';
import { useToast } from '../../../hooks/toast';
import { Container, OrderDiv, Content, Item } from './styles';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';

interface Order_item {
  id_order_item: string;
  order_id: string;
  item_id: string;
  quantity: number;
  item_value: number;
  name: string;
  total_value: number;
  description: string;
  created_at: string;
  updated_at: string;
}
interface Order {
  company_id: string;
  company_name: string;
  created_at: string;
  customer_id: string;
  customer_name: string;
  description: string;
  id_order: string;
  status: number;
  total_value: number;
  updated_at: string;
  order_items?: Order_item[];
}
interface Response {
  orders: Order[];
  order_items: Order_item[];
}

const DashboardCompany: React.FC = () => {
  const history  = useHistory();
  const { addToast } = useToast();
  const [order_items, setOrderItems] = useState<Order_item[]>([] as Order_item[]);
  const [orders, setOrders] = useState<Order[]>([] as Order[]);

  const refresh = useCallback(() => {
    api.get<Response>('/ordersCompany').then((response) => {
      const { order_items, orders } = response.data;
      setOrders(orders);
      setOrderItems(order_items);
    });
  }, []);

  const handleAcceptOrder = useCallback((order: Order) => {
    const data = {
      id_company: order.company_id,
      id_order: order.id_order,
      status: 2,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status definido como: Pedido ativo.',
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
      id_company: order.company_id,
      id_order: order.id_order,
      status: 4,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status definido como: Concluido.',
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
      id_company: order.company_id,
      id_order: order.id_order,
      status: 2,
    };
    api.patch(`/ordersCompany`, data).then((response) => {
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Status definido como: Pedido ativo.',
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
    api.get<Response>('/ordersCompany').then((response) => {
      const { order_items, orders } = response.data;
      setOrderItems(order_items);
      setOrders(orders);
      setInterval(refresh, 5000);
    });
  }, []);

  return (
    <>
      <Header />
      <Link to= '/finished-orders'>
      <Button>Pedidos finalizados</Button>
      </Link>
      <Link to= '/create-item'>
      <Button>Adicionar novo prato</Button>
      </Link>
      <Container>
        <Content>
          <OrderDiv>
            <div>
              <h1>Pedidos Pendentes</h1>
            </div>
            <div>
              {orders.map(
                (order) =>
                  order.status === 1 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>
                          {'Pedido feito às: ' +
                            new Date(order.created_at).getHours() +
                            ':' +
                            new Date(order.created_at).getMinutes()}
                        </strong>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: R$' + order.total_value}</strong>
                        <br />
                        <div>
                          {order_items.map(
                            (items) =>
                              items.order_id === order.id_order && (
                                <Item key={items.id_order_item}>
                                  <strong>{'Prato: ' + items.name}</strong>
                                  <strong>
                                    {'Quantidade: ' + items.quantity}
                                  </strong>
                                  <strong>
                                    {'Descrição do prato: ' + items.description}
                                  </strong>
                                </Item>
                              ),
                          )}
                        </div>
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
              {orders.map(
                (order) =>
                  order.status === 2 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>
                          {'Pedido feito às: ' +
                            new Date(order.created_at).getHours() +
                            ':' +
                            new Date(order.created_at).getMinutes()}
                        </strong>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: R$' + order.total_value}</strong>
                        <br />
                        <div>
                          {order_items.map(
                            (items) =>
                              items.order_id === order.id_order && (
                                <Item key={items.id_order_item}>
                                  <strong>{'Prato: ' + items.name}</strong>
                                  <strong>
                                    {'Quantidade: ' + items.quantity}
                                  </strong>
                                  <strong>
                                    {'Descrição do prato: ' + items.description}
                                  </strong>
                                </Item>
                              ),
                          )}
                        </div>
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
              {orders.map(
                (order) =>
                  order.status === 3 && (
                    <Item key={order.id_order}>
                      <div>
                        <strong>
                          {'Pedido feito às: ' +
                            new Date(order.created_at).getHours() +
                            ':' +
                            new Date(order.created_at).getMinutes()}
                        </strong>
                        <strong>{'Descrição: ' + order.description}</strong>
                        <strong>{'Valor total: R$' + order.total_value}</strong>
                        <br />
                        <div>
                          {order_items.map(
                            (items) =>
                              items.order_id === order.id_order && (
                                <Item key={items.id_order_item}>
                                  <strong>{'Prato: ' + items.name}</strong>
                                  <strong>
                                    {'Quantidade: ' + items.quantity}
                                  </strong>
                                  <strong>
                                    {'Descrição do prato: ' + items.description}
                                  </strong>
                                </Item>
                              ),
                          )}
                        </div>
                        <Button onClick={() => handleAlterOrder(order)}>
                          Aceitar pedido de alteração
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
