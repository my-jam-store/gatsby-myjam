import styled from "styled-components"

const Container = styled.div`
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
`

const NavItems = styled.nav`
  margin: 1rem auto;
  max-width: 1260px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 40px;
  align-items: center;
  a {
    text-decoration: none;
    color: #440E5E;
    font-weight: 600
  }
  box-sizing: border-box;
`

const Item = styled.div`
  padding: 20px 0;
  cursor: pointer;
`

export { Container, NavItems, Item }
