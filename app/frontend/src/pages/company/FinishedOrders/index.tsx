import React, { useEffect, useState } from 'react';

import { Container, Item } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';

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

const Order: React.FC = () => {
  const [order_items, setOrderItems] = useState<Order_item[]>([] as Order_item[]);
  const [orders, setOrders] = useState<Order[]>([] as Order[]);

  useEffect(() => {
    api.get<Response>('/ordersCompany').then((response) => {
      const { order_items, orders } = response.data;
      setOrderItems(order_items);
      setOrders(orders);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1>Pedidos</h1>
        <ul>
        {orders.map(
                (order) =>
                  order.status == 4 && (
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
                              items.order_id == order.id_order && (
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
                      </div>
                    </Item>
                  ),
              )}
        </ul>
      </Container>
    </>
  );
};

export default Order;
