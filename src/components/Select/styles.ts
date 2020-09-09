import styled, { css } from 'styled-components';

import Tooltip from '../Toltip';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 5px;
  padding: 5px;
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
    props.isFocused &&
    css`
      > svg {
        color: #009ee2;
      }
      border-color: #009ee2;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  > div {
    width: 100%;
    border: 0;

    > div {
      flex: 1;

      background: #232129;
      border: none;

      .react-select__option {
        border: none;
        background-color: #232129;
      }
    }
  }

  > svg {
    margin: 0 10px 0 5px;
  }
`;

export const Error = styled(Tooltip)`
  width: 11% !important;
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }
`;
