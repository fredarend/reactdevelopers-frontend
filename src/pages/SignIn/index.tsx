import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logo} alt="Icetec" />

      <form action="">
        <h1>Efetue seu login</h1>

        <Input name="email" placeholder="Email" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          icon={FiLock}
        />

        <Button type="submit">Entrar</Button>
      </form>
    </Content>
  </Container>
);

export default SignIn;
