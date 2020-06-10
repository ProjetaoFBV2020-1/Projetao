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

interface User {
  id_customer: string;
  name: string;
  email: string;
  date_birth: string;
  avatar: string;
  phone: string;
  inactive: boolean;
  created_at: string;
  updated_at: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [userr, setUser] = useState<User>({} as User);
  const { user } = useAuth();
  const [newValues, setNewValues] = useState<FormData>({} as FormData);
  const { addToast } = useToast();
  const history = useHistory();
  useEffect(() => {
    api.get<User>('/profileCustomer').then((response) => {
      setUser(Object.assign(userr, response.data));
      setNewValues({
        name: userr.name,
        email: userr.email,
        phone: userr.phone,
      });
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string().required('número obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        setUser(
          Object.assign(userr, {
            name: data.name,
            email: data.email,
            phone: data.phone,
          }),
        );

        api.put('/profileCustomer', userr).then((response) => {
          localStorage.setItem('@OffTalk:userr', JSON.stringify(userr));
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Credenciais trocadas com sucesso.',
          });
        });
        user.name = data.name;
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro, tente novamente',
          description: 'Ocorreu um erro ao trocar as credenciais.',
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
              <h1>Editar dados</h1>
              <button>
                <Link to="/dashboard">
                  <FiArrowLeft size={32} color="#e30000" />
                </Link>
              </button>
            </div>

            <h2>Nome Completo</h2>
            <Input
              name="name"
              icon={FiLogIn}
              type="text"
              id="nome"
              defaultValue={newValues.name}
            />
            <h2>E-mail</h2>
            <Input
              icon={FiMail}
              name="email"
              type="text"
              id="nome"
              defaultValue={newValues.email}
            />
            <h2>Phone</h2>
            <Input
              icon={FiPhone}
              name="phone"
              type="text"
              id="nome"
              defaultValue={newValues.phone}
            />
            <Button type="submit">Confirmar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
