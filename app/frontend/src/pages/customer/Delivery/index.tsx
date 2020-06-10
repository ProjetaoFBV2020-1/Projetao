import React, { useState, useEffect, useCallback } from 'react';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';
import { Container, Content, Cart, Grid, ItemBox, CartItem } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useParams, Link, useHistory } from 'react-router-dom';
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
  const history = useHistory();
  const [totalValue, setTotalValue] = useState<number>();

  useEffect(() => {
    api.get<Item[]>(`/items?company_id=${id}`).then((response) => {
      setItemList(response.data);
    });
  }, []);

  const handleRemoveMeal = useCallback(
    (item: CartItem) => {
      const newCart = cart.slice();
      try {
        const returnedValue = newCart.find(
          (obj) => obj.item_id === item.item_id,
        );
        if (returnedValue?.quantity === 1) {
          newCart.splice(newCart.indexOf(returnedValue), 1);
        } else {
          newCart[newCart.indexOf(returnedValue as CartItem)].quantity -= 1;
        }
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao remover o item',
        });
      } finally {
        setCart(newCart);
      }
    },
    [cart],
  );
  const handleAddMeall = useCallback(
    (item: CartItem) => {
      const newCart = cart.slice();
      try {
        const returnedValue = newCart.find(
          (obj) => obj.item_id === item.item_id,
        );
        newCart[newCart.indexOf(returnedValue as CartItem)].quantity += 1;
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro',
          description: 'Houve um erro ao adicionar o item',
        });
      } finally {
        setCart(newCart);
      }
    },
    [cart],
  );
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
      const { order, order_items } = response.data;
      try {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Pedido feito com sucesso.',
        });
        history.push(`/order/${order.company_name}/1/${order.id_order}`);
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
            <section>
              <h1>Menu</h1>
            </section>
            <section>
              {itemList.map((item) => (
                <button
                  onClick={() => {
                    handleAddMeal(item);
                  }}
                >
                  <ItemBox key={item.id_item}>
                    <div className="container">
                      <div className="content">
                        <strong>{item.name}</strong>
                        <strong>{item.description}</strong>
                        <strong>{item.price}</strong>
                      </div>

                      <div className="content">
                        <img
                          src="https://avatars2.githubusercontent.com/u/55264885?s=460&u=9935b27a5aec8201acbd5cf9af80728d3dd728ba&v=4"
                          alt={item.id_item}
                        />
                      </div>
                    </div>
                  </ItemBox>
                </button>
              ))}
            </section>
          </Grid>
        </Content>
        <Cart>
          <header>
            <h1>Seu pedido em</h1>
            <strong>{companyName}</strong>
          </header>
          {cart.map((item) => (
            <CartItem>
              <section className="cartcontent">
                <div>
                  <h2>
                    {item.quantity}x {item.name}
                  </h2>
                  <h2> R$ {item.price}</h2>
                </div>
                <div className="fiButtons">
                  <button
                    onClick={() => {
                      handleAddMeall(item);
                    }}
                  >
                    <FiPlusCircle></FiPlusCircle>
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveMeal(item);
                    }}
                  >
                    <FiMinusCircle></FiMinusCircle>
                  </button>
                </div>
              </section>
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
