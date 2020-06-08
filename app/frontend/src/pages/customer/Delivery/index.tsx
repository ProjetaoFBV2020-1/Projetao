import React, { useState, useEffect, useCallback } from 'react';

import { Container, Content, Cart, Grid, ItemBox } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useParams, Link } from 'react-router-dom';

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
}

//http://localhost:3333/items?company_id=3c3a9f98-c25b-45e9-90e8-41da12ae81ef
const Delivery: React.FC = () => {
  const [itemList, setItemList] = useState<Item[]>([] as Item[]);
  const [params, setParams] = useState<Params>(useParams());
  const [cart, setCart] = useState<string[]>([] as string[]);

  useEffect(() => {
    api.get<Item[]>(`/items?company_id=${params.id}`).then((response) => {
      setItemList(response.data);
    });
  }, []);

  const handleAddMeal = useCallback(
    (id: string) => {
      const newCart = cart.slice();
      newCart.push(id);
      setCart(newCart);
    },
    [cart],
  );
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Grid>
            {itemList.map((item) => (
              <button
                onClick={() => {
                  handleAddMeal(item.id_item);
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
            <h1>teste</h1>
          </header>
        </Cart>
      </Container>
    </>
  );
};

export default Delivery;
