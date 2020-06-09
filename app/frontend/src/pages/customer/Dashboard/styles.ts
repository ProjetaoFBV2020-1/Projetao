import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div``;

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
export const Schedule = styled.div`
  flex: 1;
`;

export const Grid = styled.div`
  margin-top: 64px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 200px));
  max-width: 1120px;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    border: 1px solid #787a7d;
    padding: 10px 0;

    > h3 {
      list-style: none;
    }
    > img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
`;
