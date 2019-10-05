import styled from "styled-components"

const Header = styled.header`
  margin: 1rem auto;
  max-width: 1260px;
  display: grid;
  grid-template-columns: 100px auto 200px;
  grid-gap: 50px;
  align-items: center;
  box-sizing: border-box;
`

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-bottom: 3px solid #440E5E;
`

const Div = styled.div`
  
`

export { Header, Container, Div }
