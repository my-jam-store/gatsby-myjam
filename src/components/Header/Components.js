import styled from "styled-components"
import { Cart } from "styled-icons/evil/Cart"
import { User } from "styled-icons/evil/User"
import { UserCheck } from "styled-icons/boxicons-solid/UserCheck"
import theme from "../theme"

const Header = styled.header`
  margin: 1rem auto;
  width: 1120px;
  max-width: 80%;
  display: grid;
  grid-template-columns: 50px auto 200px;
  grid-gap: 50px;
  align-items: center;
  box-sizing: border-box;
  @media only screen 
  and (max-device-width: 768px) {
    grid-gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 100%;
  }
`

const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  .snipcart-total-items {
    position: absolute;
    top: 1px;
    right: 14px;
    background: ${theme.secondaryColor};
    color: #FFF;
    border-radius: 100%;
    width: 20px;
    height: 20px;
    text-align: center;
    font-size: 11px;
    line-height: 2;
  }
  #navMobile {
    display: none;
  }
  @media only screen 
  and (max-device-width: 768px) {
    #navMobile {
      display: block;
    }
    #navDesktop {
      display: none !important;
    }
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  div {
    position: relative;
    cursor: pointer;
  }
  div:first-child div {
    visibility:hidden;
    overflow:hidden;
    transform-origin: top;
    transform: scaleY(0)  translate(-50%, 0);
    transition:all .2s ease;
  }
  div:first-child div.active {
    visibility: visible;
    transition: all .2s ease;
    transform:scaleY(1) translate(-50%, 0);
  }
  @media only screen 
  and (max-device-width: 768px) {
    justify-items: right;
  }
`

const CartIcon = styled(Cart)`
  color: ${theme.primaryColor};
  width: 50px;
  height: 50px;
`

const GuestIcon = styled(User)`
  color: ${theme.primaryColor};
  width: 50px;
  height: 50px;
`

const AuthUser = styled(UserCheck)`
  color: ${theme.primaryColor};
  width: 50px;
  height: 50px;
`

const Menu = styled.div`
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, 0);
  width: 120px;
  font-size: 15px;
  background-color: #FFF;
  padding: 15px 10px;
  display: grid;
  justify-items: center;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  border-radius: 5px;
  a {
    color: ${theme.primaryColor};
    text-decoration: none;
  }
`

export { Header, Container, Grid, CartIcon, GuestIcon, AuthUser, Menu }
