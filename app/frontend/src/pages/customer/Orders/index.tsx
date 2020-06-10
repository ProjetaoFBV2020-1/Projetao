import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { Link } from 'react-router-dom';
import { StyledLink } from '../Dashboard/styles';
import { FiAtSign, FiLink } from 'react-icons/fi';

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

const Orders: React.FC = () => {
  const [order_items, setOrderItems] = useState<Order_item[]>(
    [] as Order_item[],
  );
  const [orders, setOrders] = useState<Order[]>([] as Order[]);
  useEffect(() => {
    api.get<Response>('/ordersCustomer').then((response) => {
      const { order_items, orders } = response.data;
      setOrderItems(order_items);

      orders.forEach((order) => {
        order.order_items = order_items.filter(
          (order_item) => order_item.order_id === order.id_order,
        );
      });
      setOrders(orders);
    });
  }, []);

  useEffect(() => {
    console.log(order_items);
    console.log(orders);
  }, [orders, order_items]);
  return (
    <>
      <Header />
      <Container>
        <h1>Pedidos</h1>
        <ul>
          {orders.map((order) => (
            <div key={order.id_order}>
              <h1>{order.company_name}</h1>
              <p>{order.status}</p>

              {order.order_items?.map((item) => (
                <div key={item.id_order_item}>
                  <h6>{item.quantity}x</h6>
                  <p>{item.name}</p>
                </div>
              ))}
              <StyledLink
                to={`order/${order.company_name}/${order.status}/${order.id_order}`}
              >
                <FiLink />
              </StyledLink>
            </div>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Orders;
