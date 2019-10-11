import styled from "styled-components"
import { ArrowDownS } from "styled-icons/remix-line/ArrowDownS"

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
  position: relative;
  span {
    color: #440E5E;
    font-weight: 600;
  }
  div {
    visibility:hidden;
    overflow:hidden;
    transform-origin: top;
    transform: scaleY(0);
    transition:all .2s ease;
  }
  div.active {
    visibility: visible;
    transition: all .2s ease;
    transform:scaleY(1);
  }
  svg.rotate {
    transform: rotate(-90deg);
  }
`

const Grid = styled.div`
  position: absolute;
  top: 90%;
  background: #FFF;
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  width: 640px;
  padding: 20px;
  box-sizing: border-box;
`

const ArrowDown = styled(ArrowDownS)`
  color: #440E5E;
  width: 20px;
  height: 20px;
  transition: all .4s ease;
`

export { Container, NavItems, Grid, Item, ArrowDown }
