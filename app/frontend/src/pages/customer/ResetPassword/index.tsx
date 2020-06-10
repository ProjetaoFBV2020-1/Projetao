import React, { useEffect, useCallback, useRef } from 'react';

import { Container, Content, AnimationContainer, Background } from './styles';
import { useParams, Link, useHistory } from 'react-router-dom';
import api from '../../../services/api';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

import logoImg from '../../../assets/logo_dark_mode.svg';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

interface RecoverPasswordFormData {
  token: string;
  password: string;
}

const ResetPassword: React.FC = () => {
  const { token } = useParams();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  // rota /passwordCustomer/reset
  useEffect(() => {
    console.log(token);
  }, []);
  const handleSubmit = useCallback(
    async (data: RecoverPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        console.log(data);
        data.token = token;

        await api.post('/passwordCustomer/reset', data);
        addToast({
          type: 'success',
          title: 'Senha alterada com sucesso!',
          description: 'Você já pode fazer seu login',
        });
        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao alterar senha',
          description: 'Ocorreu um erro ao alterar senha, tente novamente.',
        });
      }
    },
    [addToast, history],
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="offtalk" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Digite sua nova senha</h1>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default ResetPassword;
