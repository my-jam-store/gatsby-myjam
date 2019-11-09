import styled from "styled-components"
import { Menu } from "styled-icons/feather/Menu"
import { ArrowDownS } from "styled-icons/remix-line/ArrowDownS"
import { Close } from "styled-icons/evil/Close"

const Container = styled.div`

`

const NavItems = styled.nav`
  display: block;
  grid-template-columns: 1fr;
  margin-top: 10px;
  align-items: center;
  overflow-y: scroll;
  padding-bottom: 75px;
  grid-template-rows: repeat(10, 50px);
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 90px;
  position: absolute;
  height: 100%;
  background: #FFF;
  top: 0;
  left: -80%;
  width: 75%;
  z-index: 9;
  box-shadow: 0 0px 8px 0 rgba(133,123,123,.75);
  transition: all 0.3s ease-in-out;
`

const Item = styled.div`
  padding: 15px 20px;
  span {
    font-size: 20px;
  }
  border-bottom: 2px solid #EAEAEA;
  div {
    visibility: hidden;
    max-height: 0;
    overflow: hidden;
    transform-origin: top;
    transform: scaleY(0);
    transition: all 0.2s ease;
  }
  div.active {
    visibility: visible;
    max-height: 100%;
    transition: all .2s ease;
    transform:scaleY(1);
  }
  svg.rotate {
    transform: rotate(-180deg);
  }
`

const List = styled.div`
  display: grid;
  background: #FAFAFA;
  margin: 10px -20px -15px;
  grid-template-columns: 1fr;
  box-sizing: border-box;
  box-sizing: border-box;
  a {
    padding: 10px 35px;
    border-bottom: 1px solid #EAEAEA;
    text-decoration: none;
    color: #333;
  }
  a:last-child {
    border-bottom: none;
  }
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: left;
  align-items: center;
  padding: 15px 25px;
  box-shadow: 0 0px 4px 0 rgba(0,0,0,.75);
  span {
    color: #440E5E;
    font-size: 30px;
    font-weight: bold;
  }
`

const ArrowDown = styled(ArrowDownS)`
  color: #440E5E;
  width: 25px;
  height: 25px;
  float: right;
  transition: all .4s ease;
`

const MenuIcon = styled(Menu)`
  color: #440E5E;
  width: 50px;
  height: 50px;
  transition: all .4s ease;
`

const CloseIcon = styled(Close)`
  color: #440E5E;
  width: 50px;
  height: 50px;
  justify-self: right;
`

export { Container, Wrapper, NavItems, Grid, List, Item, ArrowDown, MenuIcon, CloseIcon }
