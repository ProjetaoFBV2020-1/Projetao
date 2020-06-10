import React, { useRef, useEffect, useState, useCallback } from 'react';

import { Container, Content } from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import Button from '../../../components/Button';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../../components/Input';
import { FiLogIn, FiMail, FiArrowLeft } from 'react-icons/fi';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';

interface User {
  id_company: string;
  cnpj: string;
  company_name: string;
  trade_name: string;
  email: string;
  avatar: string;
  inactive: boolean;
  created_at: string;
  updated_at: string;
}

interface FormData {
  id_company: string;
  cnpj: string;
  company_name: string;
  trade_name: string;
  email: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [userr, setUser] = useState<User>({} as User);
  const { user } = useAuth();
  const [newValues, setNewValues] = useState<FormData>({} as FormData);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    api.get<User>('/profileCompany').then((response) => {
      setUser(Object.assign(userr, response.data));
      setNewValues({
        id_company: userr.id_company,
        cnpj: userr.cnpj,
        company_name: userr.company_name,
        trade_name: userr.trade_name,
        email: userr.email,
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
          cnpj: Yup.string().required('CNPJ obrigatório'),
          company_name: Yup.string().required('Razão Social é Obrigatório'),
          trade_name: Yup.string().required('Nome Fantasia é Obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        setUser(
          Object.assign(userr, {
            cnpj: data.cnpj,
            company_name: data.company_name,
            trade_name: data.trade_name,
            email: data.email,
          }),
        );

        api.put('/profileCompany', userr).then((response) => {
          localStorage.setUser('@OffTalk:userr', JSON.stringify(userr));
          addToast({
            type: 'success',
            title: 'Sucesso',
            description: 'Credenciais trocadas com sucesso.',
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
                <Link to="/">
                  <FiArrowLeft size={32} color="#e30000" />
                </Link>
              </button>
            </div>

            <h2>CNPJ</h2>
            <Input
              name="cnpj"
              icon={FiLogIn}
              type="text"
              id="nome"
              defaultValue={newValues.cnpj}
            />
            <h2>Razão Social</h2>
            <Input
              icon={FiLogIn}
              name="company_name"
              type="text"
              id="nome"
              defaultValue={newValues.company_name}
            />
            <h2>Nome Fantasia</h2>
            <Input
              icon={FiLogIn}
              name="trade_name"
              type="text"
              id="nome"
              defaultValue={newValues.trade_name}
            />
            <h2>E-Mail</h2>
            <Input
              icon={FiMail}
              name="email"
              type="text"
              id="nome"
              defaultValue={newValues.email}
            />
            <Button type="submit">Confirmar</Button>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
