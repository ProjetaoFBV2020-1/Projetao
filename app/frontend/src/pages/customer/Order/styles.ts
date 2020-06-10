import styled from 'styled-components';

export const Container = styled.div`
  height: auto;
  display: flex;
  margin-top: 30px;
  
  > div {
    margin: 0 auto;
    border: solid 1px;
    border-radius: 10px;
    
    > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 15px 0px;
      > h1 {
        margin: 0 8px;
      }
    }
  }
  section{
    display: flex;
    flex-direction: row;
    padding: 10px

    
  }
  .header{
    display: flex;
    flex-direction:column;
  }
`;
