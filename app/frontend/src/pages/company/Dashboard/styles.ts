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
`;

export const Item = styled.div`
margin-bottom 24px;
`;