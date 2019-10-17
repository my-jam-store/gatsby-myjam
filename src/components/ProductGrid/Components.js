import styled from "styled-components"
import { Plus } from "styled-icons/evil/Plus"

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
    margin-bottom: 0.2rem;
  }
  h3 span {
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 15px;
  }
`

const PlusIcon = styled(Plus)`
  color: #440E5E;
  width: 35px;
  height: 35px;
  float: right;
  position: relative;
  top: -1px;
  right: -5px;
`

export { Grid, Item, Title, PlusIcon }