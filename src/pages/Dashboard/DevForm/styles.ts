import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 75%;

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
  }
`;
