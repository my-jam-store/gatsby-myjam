import styled from "styled-components"
import { Search } from "styled-icons/octicons/Search"

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const Div = styled.div`
  
`

const TextInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 2.5rem;
  border: 2px solid #440E5E;
  border-radius: 4px;
  font-family: inherit;
  outline: none;
  :focus {
    outline: none;
  }
`

const SearchIcon = styled(Search)`
  color: #440E5E;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 50%;
  transform: translate(50%, -50%);
`

export { Container, Div, TextInput, SearchIcon }
