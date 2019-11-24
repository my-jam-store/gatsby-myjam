import styled from "styled-components"
import theme from "../../theme"

const Footer = styled.footer`
  width: 100%;
  background-color: ${theme.primaryColor};
  box-sizing: border-box;
  a {
    color: #FAFAFA;
    text-decoration: none;
    font-size: 16px;
  }
  p {
    color: #FAFAFA;
    font-size: 16px;
    margin: 0;
  }
  @media only screen 
  and (max-device-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
    width: 100%;
    max-width: 100%;
    margin-top: 50px;
    p {
      text-align: center;
    }
  }
`

const Grid = styled.div`
  margin: 0 auto;
  padding: 1.5rem 0;
  width: 1120px;
  max-width: 80%;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 30px;
  align-items: center;
  box-sizing: border-box;
  @media only screen 
  and (max-device-width: 768px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
    width: 100%;
    max-width: 100%;
    padding: 30px 20px;
    justify-items: center;
  }
`

const Links = styled.div`
  display: grid;
  grid-template-columns: repeat(3, max-content);
  grid-gap: 20px;
  @media only screen 
  and (max-device-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
`

export { Footer, Grid, Links }
