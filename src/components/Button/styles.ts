import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #009ee2;
  height: 56px;
  border-radius: 5px;
  border: 0;
  padding: 16px;
  width: 100%;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.2s;

  &:hover {
    background: ${shade(0.2, '#009EE2')};
  }
`;
