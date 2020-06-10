import React, { useState, useEffect, useCallback } from 'react';

import { Container, Content, Cart, Grid, ItemBox, CartItem } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { useToast } from '../../../hooks/toast';

interface Item {
  id_item: string;
  company_id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}
interface Params {
  id: string;
  companyName: string;
}
interface CartItem {
  item_id: string;
  quantity: number;
  description: string;
  name: string;
  price: number;
}
interface OrderItem {
  item_id: string;
  quantity: number;
  description: string;
}

//http://localhost:3333/items?company_id=3c3a9f98-c25b-45e9-90e8-41da12ae81ef
const Delivery: React.FC = () => {
  const [itemList, setItemList] = useState<Item[]>([] as Item[]);
  const [cart, setCart] = useState<CartItem[]>([] as CartItem[]);
  const { id, companyName } = useParams();
  const { addToast } = useToast();

  const [totalValue, setTotalValue] = useState<number>();

  useEffect(() => {
    api.get<Item[]>(`/items?company_id=${id}`).then((response) => {
      setItemList(response.data);
    });
  }, []);

  const handleAddMeal = useCallback(
    (item: Item) => {
      const newCart = cart.slice();
      try {
        const returnedValue = newCart.find(
          (obj) => obj.item_id === item.id_item,
        );
        newCart[newCart.indexOf(returnedValue as CartItem)].quantity += 1;
      } catch (error) {
        newCart.push({
          item_id: item.id_item,
          quantity: 1,
          description: 'string',
          name: item.name,
          price: item.price,
        });
      } finally {
        setCart(newCart);
      }
    },
    [cart],
  );
  const handleFinishOrder = useCallback(() => {
    const copyOfCart = cart.slice();
    const order = [] as OrderItem[];

    copyOfCart.forEach((element) => {
      order.push({
        item_id: element.item_id,
        quantity: element.quantity,
        description: element.description,
      });
    });

    const data = {
      company_id: id,
      description: '',
      orderItems: order,
    };

    api.post('/ordersCustomer', data).then((response) => {
      console.log(response.data);
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Pedido feito com sucesso.',
        });
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao fazer pedido',
        });
      }
    });
  }, [cart]);

  useEffect(() => {
    let newTotalValue = 0;
    cart.forEach((element) => {
      newTotalValue += element.price * element.quantity;
    });
    setTotalValue(newTotalValue);
  }, [cart]);

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Grid>
            {itemList.map((item) => (
              <button
                onClick={() => {
                  handleAddMeal(item);
                }}
              >
                <ItemBox key={item.id_item}>
                  <div>
                    <div>
                      <strong>{item.name}</strong>
                      <strong>{item.description}</strong>
                      <strong>{item.price}</strong>
                    </div>
                  </div>
                  <div>
                    <img
                      src="https://avatars2.githubusercontent.com/u/55264885?s=460&u=9935b27a5aec8201acbd5cf9af80728d3dd728ba&v=4"
                      alt={item.id_item}
                    />
                  </div>
                </ItemBox>
              </button>
            ))}
          </Grid>
        </Content>
        <Cart>
          <header>
            <h1>Seu pedido em</h1>
            <strong>{companyName}</strong>
          </header>
          {cart.map((item) => (
            <CartItem>
              <div>
                <h1>
                  {item.quantity}x {item.name}
                </h1>
                <h1> R$ {item.price}</h1>
              </div>
            </CartItem>
          ))}
          <div>
            <h3>Valor total: R${totalValue}</h3>
          </div>
          <Button onClick={handleFinishOrder}>Finalizar pedido</Button>
        </Cart>
      </Container>
    </>
  );
};

export default Delivery;
