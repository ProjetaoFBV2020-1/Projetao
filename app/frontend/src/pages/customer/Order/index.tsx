import React, { useEffect, useState } from 'react';

import { Container } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useParams, Link } from 'react-router-dom';
import { type } from 'os';

interface Item {
  created_at: string;
  description: string;
  id_order_item: string;
  item_id: string;
  item_value: number;
  name: string;
  order_id: string;
  quantity: number;
  total_value: number;
  updated_at: string;
}
interface Response {
  order_items: Item[];
}

const Order: React.FC = () => {
  const { id, status, company } = useParams();
  const [items, setItems] = useState<Item[]>([] as Item[]);
  useEffect(() => {
    api.get<Response>(`/orders?order_id=${id}`).then((response) => {
      setItems(response.data.order_items);
    });
  }, []);

  return (
    <>
      <Header />
      <Container>
        <div>
          <div>
            <h1>{company}</h1>

            <h1>{status}</h1>
          </div>

          {items.map((item) => (
            <div key={item.item_id}>
              <h1>x{item.quantity}</h1>
              <h1>{item.name}</h1>

              <h1> R$ {item.item_value}</h1>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Order;
