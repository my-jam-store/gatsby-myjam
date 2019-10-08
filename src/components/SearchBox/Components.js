import styled from "styled-components"
import { Search } from "styled-icons/octicons/Search"

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  @media only screen 
  and (max-device-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
`

const Wrapper = styled.div`
  .ais-InstantSearch__root {
    position: relative;
  }
  .ais-Hits {
    position: absolute;
    background-color: #FAFAFA;
    width: 100%;
    z-index: 1;
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
    border-radius: 3px;
  }
  .ais-Hits-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    margin: 0;
    list-style: none;
    padding: 0;
    box-sizing: border-box;
    grid-gap: 15px;
    padding: 15px;
  }
  .ais-Hits-item {
    margin: 0;
  }
  @media only screen 
  and (max-device-width: 768px) {
    .ais-Hits {
      width: 80%;
      left: 10%;
    }
  }
`

const TextInput = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 2.5rem;
  border: 3px solid #440E5E;
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

export { Container, Wrapper, TextInput, SearchIcon }
