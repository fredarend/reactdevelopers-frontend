import React, { useState } from 'react';
import { FiMail, FiUser, FiLinkedin, FiStar } from 'react-icons/fi';
import MultiSelect from 'react-multi-select-component';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, ContentForm, ContentList } from './styles';

const Dashboard: React.FC = () => {
  const technologies = [
    { label: 'C#', value: 1 },
    { label: 'Javascript', value: 2 },
    { label: 'NodeJS', value: 3 },
    { label: 'Angular', value: 4 },
    { label: 'React', value: 5 },
    { label: 'Ionic', value: 6 },
    { label: 'Mensageria', value: 7 },
    { label: 'PHP', value: 8 },
    { label: 'Laravel', value: 9 },
  ];

  const [techSelected, setTechSelected] = useState([]);

  return (
    <Container>
      <ContentForm>
        <form action="">
          <h1>Cadastre um Dev</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" placeholder="Email" icon={FiMail} />
          <Input
            name="idade"
            type="number"
            min="0"
            placeholder="Idade"
            icon={FiStar}
          />
          <Input
            name="url_linkedin"
            placeholder="Perfil do Linkedin"
            icon={FiLinkedin}
          />
          <MultiSelect
            options={technologies}
            value={techSelected}
            onChange={setTechSelected}
            labelledBy="Tecnologias do Dev"
            disableSearch
            overrideStrings={{
              selectSomeItems: 'Selecione as tecnologias...',
              allItemsAreSelected: 'Todas as tecnologias selecionas',
              selectAll: 'Selecionar todas',
            }}
          />

          <Button type="submit">Cadastrar</Button>
        </form>
      </ContentForm>
      <ContentList>a</ContentList>
    </Container>
  );
};

export default Dashboard;
