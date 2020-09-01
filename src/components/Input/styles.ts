import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 5px;
  border: 2px solid #232129;
  padding: 12px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    color: #eee;

    background: transparent;
    border: 0;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
