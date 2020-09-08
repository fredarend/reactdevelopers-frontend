import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  height: 100vh;
  background: ${lighten(0.1, '#312e38')};
  overflow-y: scroll;
  padding: 40px;

  width: 100%;
`;

export const DevContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;

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
