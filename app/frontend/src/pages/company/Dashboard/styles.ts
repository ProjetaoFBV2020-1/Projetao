import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  display: flex;
  width: 1120px;
`;

export const OrderDiv = styled.div`
  padding: 30px;

  > div {
    align-items: center;
    width: 400px;
  }

  > div + div {
    > Button {
      width: 100px;
    }
    strong {
      display: flex;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 5px;
  border: 1px solid #787a7d;
  margin-left: 128px;
`;

export const Item = styled.div`
  margin-bottom: 24px;
  border-radius: 5px;
  border: 1px solid #787a7d;
  div {
  border: none;
  }
`;
