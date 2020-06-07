import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 36px;
  }
  p {
    margin-top: 8px;
    color: #e30000;
    span + span {
      margin-left: 8px;
      padding-left: 8px;
      border-left: 1px solid #e30000;
    }
  }
`;

export const Cart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  border-color: #0015;
  border-style: solid;
  header {
    margin: 0 30px;
    padding: 20px 0;
  }
`;
