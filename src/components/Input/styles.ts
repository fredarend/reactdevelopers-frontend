import styled, { css } from 'styled-components';

import Tooltip from '../Toltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  hidden: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 5px;
  padding: 12px;
  width: 100%;

  border: 2px solid #232129;
  color: #666360;
  transition: 0.2s;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #009ee2;
      border-color: #009ee2;
    `}

  ${props =>
    props.hidden &&
    css`
      background: transparent;
      border: none;
      padding: 0;
    `}

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

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
