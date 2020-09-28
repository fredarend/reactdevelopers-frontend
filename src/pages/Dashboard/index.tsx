import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  FiEdit,
  FiXCircle,
  FiMail,
  FiUser,
  FiLinkedin,
  FiStar,
  FiZap,
  FiLoader,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import ReactSelect from 'react-select';

import getValidationErrors from '../../utils/getValidationErrors';
import { api, config } from '../../services/api';
import { useAuth } from '../../hooks/auth';
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
  Search,
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
  const [editDev, setEditDev] = useState(false);
  const [isLoadingDevs, setIsLoadingDevs] = useState(false);
  const [isLoadingAddDev, setIsLoadingAddDev] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const { signOut } = useAuth();

  const getDevelopers = useCallback(async () => {
    try {
      setIsLoadingDevs(true);
      await api.get('/developers', config).then(response => {
        setDevelopers(response.data);
      });
      setIsLoadingDevs(false);
    } catch (err) {
      setIsLoadingDevs(true);
      addToast({
        type: 'error',
        title: 'Não foi possível carregar os desenvolvedores.',
      });
      setIsLoadingDevs(false);
    }
  }, [setDevelopers, addToast]);

  useEffect(() => {
    getDevelopers();
  }, [getDevelopers]);

  const handleSearch = useCallback(
    async action => {
      try {
        const devs = developers.filter(dev =>
          dev.technologies.some(tech => tech.id === action.value),
        );

        setDevelopers(devs);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Não há desenvolvedores cadastrados.',
        });
      }
    },
    [addToast, developers],
  );

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
        setIsLoadingAddDev(true);
        await api.post('/developers', data, config);

        addToast({
          type: 'success',
          title: 'Dev cadastrado com sucesso!',
        });

        formRef.current?.reset();
        const select = formRef.current?.getFieldRef('technologies');
        select.select.clearValue();
        setIsLoadingAddDev(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        setIsLoadingAddDev(true);
        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description:
            'Ocorreu um erro ao efetuar o cadastro do desenvolvedor.',
        });
        setIsLoadingAddDev(false);
      }
      getDevelopers();
    },
    [addToast, getDevelopers],
  );

  const handleShowDataInForm = useCallback(
    async (id: number) => {
      try {
        setEditDev(true);
        const { data } = await api.get(`/developers/?id=${id}`, config);
        const { developer } = data;

        formRef.current?.setFieldValue('id', id);
        formRef.current?.setFieldValue('name', developer.name);
        formRef.current?.setFieldValue('email', developer.email);
        formRef.current?.setFieldValue('age', developer.age);
        formRef.current?.setFieldValue('url_linkedin', developer.url_linkedin);
        formRef.current?.setData({ technologies: developer.technologies });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Ocorreu um erro ao carregar os dados do dev.',
        });
      }
    },
    [addToast],
  );

  const handleCancelEdit = useCallback(() => {
    setEditDev(false);
    formRef.current?.reset();
    const select = formRef.current?.getFieldRef('technologies');
    select.select.clearValue();
  }, []);

  const handleEditDev = useCallback(
    async (data: DevelopersData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório!'),
          email: Yup.string().email().required('Email obrigatório!'),
          age: Yup.number().required('Idade obrigatória!'),
          url_linkedin: Yup.string().required('URL obrigatória!'),
          technologies: Yup.string().required(
            'Selecione pelo menos uma tecnologia.',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.put(`/developers/${data.id}`, data, config);

        addToast({
          type: 'success',
          title: 'Dev atualizado com sucesso!',
        });

        formRef.current?.reset();
        const select = formRef.current?.getFieldRef('technologies');
        select.select.clearValue();
        setEditDev(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          formRef.current?.setFieldValue('id', data.id);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro.',
          description: 'Ocorreu um erro ao editar o dev.',
        });
      }
      getDevelopers();
    },
    [addToast, getDevelopers],
  );

  const handleRemoveDev = useCallback(
    async (id: number) => {
      try {
        setIsLoadingDelete(true);

        await api.delete(`/developers/${id}`, config);
        addToast({
          type: 'success',
          title: 'Dev removido com sucesso!',
        });
        setIsLoadingDelete(false);
        handleCancelEdit();
      } catch (err) {
        setIsLoadingDelete(true);
        addToast({
          type: 'error',
          title: 'Aconteceu um problema ao remover o dev.',
        });
        setIsLoadingDelete(false);
      }
      getDevelopers();
    },

    [addToast, getDevelopers, handleCancelEdit],
  );

  return (
    <Container>
      <FormContainer>
        <img src={logo} alt="Icetec" />
        <Form ref={formRef} onSubmit={editDev ? handleEditDev : handleAddDev}>
          <h1>{editDev ? 'Editar dev' : 'Cadastre um dev'}</h1>

          {editDev ? (
            <Input name="id" placeholder="id" type="hidden" hidden />
          ) : (
            ''
          )}

          <Input name="name" placeholder="Nome" icon={FiUser} hidden={false} />
          <Input
            name="email"
            placeholder="Email"
            icon={FiMail}
            hidden={false}
          />
          <Input
            name="age"
            type="number"
            min="0"
            max="99"
            placeholder="Idade"
            icon={FiStar}
            hidden={false}
          />
          <Input
            name="url_linkedin"
            placeholder="URL do Perfil Linkedin"
            icon={FiLinkedin}
            hidden={false}
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

          <Button disabled={isLoadingAddDev} type="submit">
            {isLoadingAddDev ? <FiLoader size={20} /> : ''}
            {editDev && !isLoadingAddDev ? 'Salvar' : 'Cadastrar'}
          </Button>
          {editDev ? (
            <div>
              <button onClick={handleCancelEdit} type="button">
                Cancelar
              </button>
            </div>
          ) : (
            ''
          )}
        </Form>
        <button onClick={() => signOut()} type="button">
          Logout
        </button>
      </FormContainer>
      <DevContainer>
        <Search>
          <ReactSelect
            name="search_techs"
            placeholder="Filtrar por tecnologia"
            options={multiSelectOptions}
            onChange={handleSearch}
            onMenuOpen={getDevelopers}
            className="react-select-container"
            classNamePrefix="react-select"
            isDisabled={editDev}
          />
          <button type="button" onClick={getDevelopers}>
            Buscar todas
          </button>
        </Search>
        {isLoadingDevs && <FiLoader className="loading-devs" size={20} />}
        {developers.length ? (
          developers.map(developer => (
            <Dev key={developer.id}>
              <Info>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={developer.url_linkedin}
                >
                  <h1>{developer.name}</h1>
                </a>

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
                <button
                  type="button"
                  onClick={() => handleShowDataInForm(developer.id)}
                >
                  <FiEdit size={18} />
                </button>
                <button
                  disabled={isLoadingDelete}
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
