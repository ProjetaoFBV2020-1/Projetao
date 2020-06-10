import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;

  flex-direction: column;
  align-items: center;

  align-items: stretch;
  > div {
    margin: 0 auto;
    > div {
      display: flex;
      flex-direction: row;
      margin: 15px 0px;
      > h1 {
        margin: 0 8px;
      }
    }
  }
`;
