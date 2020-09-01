import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 75%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: left;

    h1 {
      margin-bottom: 24px;
    }

    .multi-select {
      --rmsc-hover: #4a4554;
      --rmsc-selected: #4a4554;
      --rmsc-border: 2px solid #232129;
      --rmsc-bg: #232129;
      --rmsc-h: 47px;
    }
  }
`;

export const ContentList = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${lighten(0.1, '#312e38')};

  width: 100%;
`;
