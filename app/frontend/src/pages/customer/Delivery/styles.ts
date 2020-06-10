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
export const Cart = styled.div`
  flex-direction: column;
  height: 100vh;
  background-color: #312e38;
  padding: 30px;
  width: 400px;
  max-width: 1120px;
  box-shadow: rgba(0, 0, 0, 0.3) -3px 0px 10px -5px;
  background-image: initial;

  header {
    justify-content: center;
    > h1 {
      font-weight: 300;
      font-size: 0.875rem;
    }
    > strong {
      margin: 8px 0 0 0;
      font-size: 1.375rem;
      font-weight: 500;
    }
    margin: 0 ;
    padding: 20px 0;
  }
   
  }
  div{
   
    display:flex;
    justify-content:center;
    flex-direction: column;
    >h3 {
    margin: 0 30px;
    padding: 20px 0;
  }
  
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
  display: flex;
  flex-direction: row;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  height: 200px;
  button {
    color: #fff;
    background: 0;
    border: 0;
  }
`;

export const CartItem = styled.div`
  max-height: 100px;
  > div {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 1.375rem;
    }

    border-top: solid 1px;
    margin: 0 30px;
    padding: 12px 0 16px;
  }
  div {
    border-top: #dcdcdc solid 1px;
    margin: 0 30px;
    padding: 12px 0 16px;
  }
`;
