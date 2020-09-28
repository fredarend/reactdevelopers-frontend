import React, { useRef, useCallback, useState } from 'react';
import { FiMail, FiLock, FiLoader } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!'),
          password: Yup.string().required('Senha Obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setIsLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });

        setIsLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação.',
          description:
            'Ocorreu um erro ao efetuar login, verifique as credenciais.',
        });
        setIsLoading(false);
      }
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <Content>
        <img src={logo} alt="Icetec" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Efetue seu login</h1>

          <Input
            name="email"
            placeholder="Email"
            icon={FiMail}
            hidden={false}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            icon={FiLock}
            hidden={false}
          />

          <Button disabled={isLoading} type="submit">
            {isLoading ? <FiLoader size={20} /> : 'Entrar'}
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
