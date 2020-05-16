import styled from "styled-components"
import { Search } from "styled-icons/octicons/Search"
import { Minus } from "styled-icons/boxicons-regular/Minus"
import { Plus as qPlus } from "styled-icons/boxicons-regular/Plus"
import { Plus } from "styled-icons/evil/Plus"
import { Cart } from "styled-icons/evil/Cart"
import { CloseO } from "styled-icons/evil/CloseO"
import theme from "../../theme"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1rem;
  justify-content: center;
`

const Title = styled.h1`
  margin: 1.5rem 0;
  font-weight: 600;
  font-family: 'Nunito';
  color: #333;
  @media only screen 
  and (max-device-width: 768px) {
    text-align: center;
  }
`

const Item = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background: #FFF;
  padding: 0.5rem;
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  box-sizing: border-box;
  img {
    margin-bottom: 0.5rem;
    width: 100%;
    border-radius: 5px;
  }
  h3 {
    margin-bottom: 0.2rem;
  }
  h3 span {
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 18px;
  }
  @media only screen 
  and (max-device-width: 768px) {
    padding: 1rem;
    h3 {
      margin-bottom: 0.5rem;
    }
  }
`

const PlusIcon = styled(Plus)`
  color: ${theme.secondaryColor};
  width: 35px;
  height: 35px;
  float: right;
  position: relative;
  top: -1px;
  right: -5px;
  @media only screen 
  and (max-device-width: 768px) {
    display: none;
  }
`
const QuantityBoxMobile = styled.div`
  display: none;
  div {
    position: relative;
    box-sizing: border-box;
  }
  input {
    width: 100%;
    height: 100%;
    text-align: center;
    border-radius: 5px;
    font-size: 20px;
    border: 1px solid #EAEAEA;
    outline: none !important;
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
    user-select: none;
  }
  button {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    background: ${theme.secondaryColor};
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
    color: #FFF;
    border: 1px solid ${theme.secondaryColor};
    :focus {
      outline: none !important;
    }
  }
  span {
    grid-column: 1/-1;
  }
  svg:nth-child(2) {
    top: 50%;
    right: 10px;
    height: 30px;
    width: 30px;
    transform: translate(0, -50%);
  }
  svg:nth-child(3) {
    top: 50%;
    left: 10px;
    height: 30px;
    width: 30px;
    transform: translate(0, -50%);
  }
  @media only screen 
  and (max-device-width: 768px) {
    display: grid;
    margin-top: 0.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: 50px;
    grid-gap: 0.75rem;
    justify-content: center;
    align-content: center;
    user-select: none; 
    button {
      padding: 10px 0;
    }
  }
`

const Content = styled.div`
  border-radius: 5px;
  background: #FBFCFF;
  padding: 2rem;
  position: relative;
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  user-select: none;
  img {
    margin: 0;
  }
  .product-info {
    padding-left: 2rem;
  }
  .name {
    text-transform: capitalize;
    margin-bottom: 1rem;
    line-height: 1.3;
    font-weight: 500;
  }
  p {
    margin-bottom: 0;
  }
  span.price {
    color: #440E5E;
    font-size: 22px;
    font-weight: bold;
    display: inline-block;
    padding: 1.5rem 0;
  }
`

const QtyPlus = styled(qPlus)`
  color: ${theme.secondaryColor};
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 5px;
  cursor: pointer;
`

const QtyMinus = styled(Minus)`
  color: ${theme.secondaryColor};
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 10px;
  right: 5px;
  cursor: pointer;
`

const QuantityBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 60px;
  grid-gap: 0.5rem;
  justify-content: center;
  align-content: center;
  margin-top: 0.4rem;
  user-select: none;
  div {
    position: relative;
    box-sizing: border-box;
  }
  input {
    width: 100%;
    height: 100%;
    padding-left: 1.5rem;
    border-radius: 5px;
    border: 1px solid #EAEAEA;
    outline: none !important;
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
    user-select: none;
  }
  button {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    cursor: pointer;
    background: ${theme.secondaryColor};
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
    color: #FFF;
    border: 1px solid ${theme.secondaryColor};
    :focus {
      outline: none !important;
    }
  }
`

const CartIcon = styled(Cart)`
  color: #FFF;
  width: 30px;
  height: 30px;
  position: relative;
  left: -10px;
`

const CloseIcon = styled(CloseO)`
  color: #440E5E;
  width: 45px;
  height: 45px;
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
`

const Wrapper = styled.div`
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
    order: 3;
    grid-column: 1/-1;
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
  border: 3px solid ${theme.primaryColor};
  border-radius: 4px;
  font-family: inherit;
  outline: none;
  :focus {
    outline: none;
  }
  @media only screen 
  and (max-device-width: 768px) {
    border-radius: 25px;
  }
`

const SearchIcon = styled(Search)`
  color: ${theme.primaryColor};
  position: absolute;
  width: 25px;
  height: 25px;
  top: 50%;
  transform: translate(50%, -50%);
`

const Div = styled.div`
  width: 100%;
  position: absolute;
  padding: 0 50px 50px;
  left: 0;
  top: 86px;
  background-color: #EAEAEA;
  z-index: 2;
  @media only screen 
  and (max-device-width: 768px) {
    top: 160px;
    padding: 0 25px 50px;
    box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  }
`

export {
  Container, Wrapper, TextInput,
  SearchIcon, Grid, Item,
  Title, PlusIcon, Content,
  QuantityBox, QuantityBoxMobile, QtyPlus,
  QtyMinus, CartIcon, CloseIcon, Div
}
