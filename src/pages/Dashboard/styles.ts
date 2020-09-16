import styled from 'styled-components';
import { lighten, darken } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 75%;

  > button {
    background: transparent;
    border: none;
    color: #fff;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  img {
    width: 25%;
  }

  form {
    margin: 25px 0;
    width: 340px;
    text-align: left;

    h1 {
      margin-bottom: 24px;
      text-align: center;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 5px;
      button {
        background: transparent;
        border: none;
        color: white;
      }
    }
  }
`;

export const DevContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  background: ${lighten(0.1, '#312e38')};
  overflow-y: scroll;
  padding: 40px;
`;

export const Dev = styled.div`
  display: flex;
  background: #312e38;
  border-radius: 10px;
  padding: 14px;
  transition: 0.2s;

  &:hover {
    transform: translateX(5px);
  }

  & + div {
    margin-top: 10px;
  }
`;

export const Info = styled.div`
  margin-right: 15px;
  border-right: solid ${lighten(0.1, '#312e38')} 2px;
  padding-right: 25px;
  width: 40%;

  h1 {
    color: #aaa;
    font-size: 15px;
    margin-bottom: 5px;
  }

  p {
    font-size: 13px;
    line-height: 20px;
    color: #eee;
  }
`;

export const Techs = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  span {
    border: solid 1px #009ee2;
    padding: 5px 10px 5px 10px;
    border-radius: 15px;
    margin: 0 0 5px 5px;
    font-size: 14px;
    transition: 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #009ee2;
    }
  }
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-left: solid ${lighten(0.1, '#312e38')} 2px;
  padding-left: 15px;
  margin-left: 10px;

  button {
    background: transparent;
    border: 0;
    color: #009ee2;
    transition: 0.2s;

    &:hover {
      color: ${darken(0.1, '#009ee2')};
    }
  }
`;
export const Search = styled.div`
  margin-bottom: 20px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    width: 140px;
    margin-left: 20px;
    background: #232129;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 9px 8px 9px 8px;
    transition: 0.2s;

    &:hover {
      background: ${darken(0.1, '#232129')};
    }
  }

  > div {
    width: 100%;

    > div {
      border-radius: 5px;
      border-color: #232129;
      background: #232129;
      color: #232129;
      transition: 0.2s;

      .react-select__single-value {
        color: #fff;
      }

      .react-select__option {
        border: none;
        background: #232129;
        color: #fff;
      }
    }
  }
`;
