import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 64px;
  margin-left: 30%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h1 {
    font-size: 36px;
  }
`;

export const Content = styled.div`
  display: flex;
`;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  div {
    > div {
      display: flex;
      flex-direction: column;
    }
    img {
      border-radius: 50%;
      width: 64px;
    }
  }
`;
export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;

  button {
    color: #fff;
    background: 0;
    border: 0;
  }
`;
