import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Container, Content } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import { FiLogIn, FiMail, FiPhone, FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';

interface Item {
  company_id: string;
  name: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
}

interface FormData {
  company_id: string;
  name: string;
  price: number;
  description: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [item, setItem] = useState<Item>({} as Item);
  const { user } = useAuth();
  const [newValues, setNewValues] = useState<FormData>({} as FormData);
  const { addToast } = useToast();
  const history = useHistory();



  
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});
        
        const schema = Yup.object().shape({
          name: Yup.string().required('Insira um nome para o prato!'),
          price: Yup.number().required('Insira um preço para o prato!'),
          description: Yup.string().required('Insira um nome para o prato!'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setItem(
          Object.assign(item, {
            name: data.name,
            price: data.price,
            description: data.description,
          }),
        );

        api.post('/items', item).then((response) => {
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Item adicionado com sucesso.',
          });
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro, tente novamente',
          description: 'Ocorreu um erro ao adicionar o item.',
        });
      }
    },
    [addToast],
  );
  return (
    <>
      <Header />
      <Container>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h1>Adicionar Prato</h1>
              <button>
                <Link to="/">
                  <FiArrowLeft size={32} color="#e30000" />
                </Link>
              </button>
            </div>

            <h2>Nome do prato</h2>
            <Input
              name="name"
              icon={FiLogIn}
              type="text"
              id="nome"
              placeholder="Nome do prato"
            />
            <h2>Preço</h2>
            <Input
              icon={FiLogIn}
              name="price"
              type="text"
              id="nome"
              placeholder="Preço"
            />
            <h2>Descrição</h2>
            <Input
              icon={FiLogIn}
              name="description"
              type="text"
              id="nome"
              placeholder="Descrição"
            />
            <Button type="submit">Confirmar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
