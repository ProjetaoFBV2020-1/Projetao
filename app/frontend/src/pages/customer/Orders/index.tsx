import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';

interface Order {
  id_order: string;
  company_id: string;
  customer_id: string;
  status: number;
  description: string;
  total_value: string;
  created_at: string;
  updated_at: string;
}
const Order: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([] as Order[]);
  useEffect(() => {
    api.get<Order[]>('/ordersCustomer').then((response) => {
      setOrders(response.data);
      console.log(response.data[0]);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <h1>Pedidos</h1>
        <ul>
          {orders.map((order) => (
            <div key={order.id_order}>
              <h1>{order.status}</h1>
              <h3>{order.description}</h3>
            </div>
          ))}
        </ul>
      </Container>
    </>
  );
};

export default Order;
