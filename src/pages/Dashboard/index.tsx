import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  FiEdit,
  FiXCircle,
  FiMail,
  FiUser,
  FiLinkedin,
  FiStar,
  FiZap,
} from 'react-icons/fi';
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

import {
  Container,
  FormContainer,
  DevContainer,
  Dev,
  Info,
  Techs,
  Actions,
} from './styles';

type Technologies = any[];

interface DevelopersData {
  id: number;
  name: string;
  email: string;
  age: number;
  url_linkedin: string;
  technologies: Technologies;
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
  const [developers, setDevelopers] = useState<DevelopersData[]>([]);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const getDevelopers = useCallback(async () => {
    try {
      await api.get('/developers').then(response => {
        setDevelopers(response.data);
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Não foi possível remover o Dev',
      });
    }
  }, [setDevelopers, addToast]);

  useEffect(() => {
    getDevelopers();
  }, [getDevelopers]);

  const handleAddDev = useCallback(
    async (data: DevelopersData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string().email().required('Email obrigatório!'),
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
        const select = formRef.current?.getFieldRef('technologies');
        select.select.clearValue();
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
      getDevelopers();
    },
    [addToast, getDevelopers],
  );

  const handleRemoveDev = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/developers/${id}`);
        addToast({
          type: 'success',
          title: 'Dev removido com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Aconteceu um problema ao remover o dev.',
        });
      }
      getDevelopers();
    },
    [addToast, getDevelopers],
  );

  const handleEditDev = useCallback(() => {
    console.log('teste');
  }, []);

  return (
    <Container>
      <FormContainer>
        <img src={logo} alt="Icetec" />

        <Form ref={formRef} onSubmit={handleAddDev}>
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
            isClearable
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
      </FormContainer>
      <DevContainer>
        {developers.length ? (
          developers.map(developer => (
            <Dev key={developer.id}>
              <Info>
                <h1>{developer.name}</h1>
                <p>{developer.email}</p>
                <p>
                  {developer.age}
                  <span> anos</span>
                </p>
              </Info>
              <Techs>
                {developer.technologies.map(techs => (
                  <span key={techs.id}>{techs.name}</span>
                ))}
              </Techs>
              <Actions>
                <button type="button" onClick={handleEditDev}>
                  <FiEdit size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveDev(developer.id)}
                >
                  <FiXCircle size={18} />
                </button>
              </Actions>
            </Dev>
          ))
        ) : (
          <h1>Não há nenhum dev cadastrado.</h1>
        )}
      </DevContainer>
    </Container>
  );
};

export default Dashboard;
