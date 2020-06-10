import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 728px;
  display: flex;
  width: 1366px;
  margin: 0px auto;
  flex-direction: column;
  max-height: 100%;
  > h1 {
    margin: 0 auto;
  }
  > ul {
    align-items: center;
    column-gap: 20px;
    display: grid;
    grid-template-columns: 422px 422px 422px;
    height: 340px;
    justify-content: center;
    margin-top: 20px;
    row-gap: 20px;
    width: 1366px;
    > div {
      flex-direction: column;
      align-items: flex-start;
      border-radius: 5px;
      border: 1px solid #fff;
      column-gap: 14px;
      display: flex;
      height: 200px;
      align-items: center;
      width: 422px;
      > div {
        margin-top: 5px;
        flex-direction: row;
        display: flex;
        align-items: center;
        > h6 {
          color: #c97d32;
        }
      }
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: aqua;
`;
