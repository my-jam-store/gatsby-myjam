import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1.5rem;
  justify-content: center;
`

const Title = styled.h1`
  margin: 1.5rem 0;
  font-weight: 500;
  color: #333;
`

const Item = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background: #FFF;
  padding: 1rem;
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  box-sizing: border-box;
  img {
    margin-bottom: 0.5rem;
  }
  h3 {
    font-size: 20px;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`

export { Grid, Item, Title }