import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiUser, FiLinkedin, FiStar, FiZap } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import logo from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { Container, ContentForm, ContentList } from './styles';

interface DevelopersData {
  name: string;
  email: string;
  age: number;
  url_linkedin: string;
  technologies: object;
}

type OptionType = {
  value: number;
  label: string;
};

const multiSelectOptions: OptionType[] = [
  { value: 1, label: 'C#' },
  { value: 2, label: 'Javacript' },
  { value: 3, label: 'NodeJS' },
  { value: 4, label: 'Angular' },
  { value: 5, label: 'Ionic' },
  { value: 6, label: 'React' },
  { value: 7, label: 'Messageria' },
  { value: 8, label: 'PHP' },
  { value: 9, label: 'Laravel' },
];

const Dashboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: DevelopersData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string().required('Email obrigatório!'),
          age: Yup.string().required('Idade obrigatória!'),
          url_linkedin: Yup.string().required('URL obrigatória!'),
          technologies: Yup.string().required(
            'Selecione pelo menos uma tecnologia.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/developers', data);

        addToast({
          type: 'success',
          title: 'Dev cadastrado com sucesso!',
        });

        formRef.current?.reset();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description:
            'Ocorreu um erro ao efetuar o cadastro do desenvolvedor.',
        });
      }
    },
    [addToast],
  );

  return (
    <Container>
      <ContentForm>
        <img src={logo} alt="Icetec" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Cadastre um Dev</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="Email" icon={FiMail} />
          <Input
            name="age"
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
          <Select
            name="technologies"
            isMulti
            options={multiSelectOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Tecnologias"
            icon={FiZap}
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </ContentForm>
      <ContentList>a</ContentList>
    </Container>
  );
};

export default Dashboard;
