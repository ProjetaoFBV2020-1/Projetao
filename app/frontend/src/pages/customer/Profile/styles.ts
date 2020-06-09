import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 0 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > form {
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      > h1 {
        font-weight: 500;
        margin: 20px;
      }
      > button {
        border-radius: 10px;
        border: 0;
        background: 0;
      }
    }
    height: 100%;
    margin: 40px 0;
    width: 500px;
    margin-bottom: 50px;
    h2 {
      margin: 12px 0 4px 24px;
    }
  }
`;
