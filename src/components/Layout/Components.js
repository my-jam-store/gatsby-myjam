import styled from "styled-components"

const Main = styled.main`
  width: 1120px;
  max-width: 80%;
  margin: 0 auto 100px;
  @media only screen 
  and (max-device-width: 768px) {
    max-width: 100%;
    margin: 40px auto;
    padding: 0 20px;
  }
`

export { Main }