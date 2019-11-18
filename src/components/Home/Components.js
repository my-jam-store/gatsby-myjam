import styled from "styled-components"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 25px;
`

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  box-shadow: 0 1px 6px 3px rgba(133,123,123,.75);
  img {
    border-radius: 10px;
  }
  h1 {
    position: absolute;
    bottom: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.6);
    color: #FAFAFA;
    width: 100%;
    padding: 20px;
    font-size: 25px;
    letter-spacing: 5px;
    text-transform: uppercase;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }
`

export { Grid, Wrapper }
