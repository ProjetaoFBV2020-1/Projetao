import styled from 'styled-components';

export const Item = styled.div`
  margin-bottom: 24px;
  border-radius: 5px;
  border: 1px solid #787a7d;
  div {
  border: none;
  }
  strong {
    
  }
`;

export const Container = styled.div`
  height: 728px;
  display: flex;
  width: 1366px;
  margin: 0px auto;
  flex-direction: column;
  > h1 {
    margin: 0 auto;
  }
  > ul {
    margin: 0 auto;
    align-items: center;
    column-gap: 20px;
    display: grid;
    grid-template-columns: 422px 422px 422px;
    height: 340px;
    justify-content: center;
    margin-top: 20px;
    row-gap: 20px;
    width: 1120px;
    > div {
      align-items: flex-start;
      border-radius: 5px;
      border: 1px solid #fff;
      column-gap: 14px;
      display: grid;
      height: 200px;
      justify-content: center;
      width: 422px;
    }
  }
`;
