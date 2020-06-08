import React, { useState, useEffect, useCallback } from 'react';

import { Container, Content, Grid, ItemBox } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';


interface Order {
  id_order: string;
  company_id: string;
  customer_id: string;
  status: string;
  name: string;
  price: string;
  description: string;
}
interface Params {
  id: string;
}

const Orders: React.FC = () => {
  const [orderList, setOrderList] = useState<Order[]>([] as Order[]);
  const [acceptedList, setAcceptedList] = useState<Order[]>([] as Order[]);

  useEffect(() => {
    api.get<Order[]>('/Orders').then((response) => {
      setOrderList(response.data);
    });
  }, []);

  const handleAccept = useCallback(
    (id: string) => {
      const accept = orderList.slice();
      const returnedValue = accept.find(obj => obj.id_order === id);
      const newList = acceptedList.slice();
      newList.push(returnedValue as Order);
      setAcceptedList(newList);
      accept.splice(accept.indexOf(returnedValue as Order));
      setOrderList(accept);
    },//^^ Aceitar Pedido e enviar para o back
    [acceptedList],
  );
  console.log(orderList);
  return (
    <Container>
      <Header />
      <Content>
        <h1>Dale boy</h1>
        <p>
          <span>Hoje</span>
          <span>dia 06</span>
          <span>Segunda-feira</span>
        </p>
        <Grid>
          {orderList.map(order => (
            <button
              onClick={() => {
                handleAccept(order.id_order);
              }}>
              //^^ Aceitar Pedido e enviar para o back
              <div>
                <img
                  src="https://avatars2.githubusercontent.com/u/55264885?s=460&u=9935b27a5aec8201acbd5cf9af80728d3dd728ba&v=4"
                />
              </div>
            </button>
          ))}
        </Grid>
      </Content>
    </Container>
  );
}

export default Orders;