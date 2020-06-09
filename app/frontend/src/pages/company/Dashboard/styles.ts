import styled from 'styled-components';

export const Container = styled.div`
  height: 80vh;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    > Button {
      width: 100px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
