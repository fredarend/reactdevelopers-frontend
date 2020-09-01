import React, { useCallback } from 'react';
import { FiMail, FiUser, FiLinkedin, FiStar } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ContentForm, ContentList } from './styles';

const Dashboard: React.FC = () => {
  const handleSubmit = useCallback(async (data: string) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório!'),
        email: Yup.string()
          .required('Email obrigatório!')
          .email('Digite um email válido!'),
        idade: Yup.string().required('Idade obrigatória!'),
        url_linkedin: Yup.string().required('URL obrigatória!'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <ContentForm>
        <img src={logo} alt="Icetec" />

        <Form onSubmit={handleSubmit}>
          <h1>Cadastre um Dev</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="Email" icon={FiMail} />
          <Input
            name="idade"
            type="number"
            min="0"
            max="99"
            placeholder="Idade"
            icon={FiStar}
          />
          <Input
            name="url_linkedin"
            placeholder="Perfil do Linkedin"
            icon={FiLinkedin}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </ContentForm>
      <ContentList>a</ContentList>
    </Container>
  );
};

export default Dashboard;
