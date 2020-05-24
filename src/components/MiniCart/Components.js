import styled from "styled-components"
import { Cart } from "styled-icons/evil/Cart"
import { Plus } from "styled-icons/boxicons-regular/Plus"
import { Minus } from "styled-icons/boxicons-regular/Minus"
import { Close } from "styled-icons/evil/Close"
import { TrashAlt } from "styled-icons/fa-solid/TrashAlt"
import { ShoppingBag } from "styled-icons/feather/ShoppingBag"
import { Loader4 } from "styled-icons/remix-fill/Loader4"
import theme from "../../theme"

export const Content = styled.div`
  background-color: #FBFCFF;
  box-shadow: 0 1px 6px 3px rgba(0,0,0,.5);
  padding: 25px;
  border-radius: 5px;
  height: 85vh;
  overflow-y: scroll;
`

export const EmptyContent = styled.div`
  background-color: #FBFCFF;
  box-shadow: 0 1px 6px 3px rgba(0,0,0,.5);
  padding: 35px;
  border-radius: 5px;
  h2 {
    font-weight: 500;
    line-height: 1.5;
    margin: 0;
  }
`

export const Title = styled.h3`
  background-color: #EAEAEA;
  text-align: center;
  font-weight: 500;
  font-size: 25px;
  padding: 20px;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  margin: 0 0 10px 0;
`

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 0 20px;
  position: relative;
  padding: 0 10px;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  border-bottom: 1px solid #EAEAEA;
  & > *:not(:first-child) {
    justify-self: center;
  }
`

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  & div:last-child {
    border-bottom: none !important;
  }
`

export const Track = styled.div`
  padding: 20px 0;
`

export const Text = styled.span`
  font-size: 16px;
  user-select: none;
`

export const TextHeader = styled.span`
  font-size: 18px;
  padding: 10px 0;
  font-weight: 700;
  user-select: none;
`

export const CartIcon = styled(Cart)`
  color: ${theme.primaryColor};
  width: 50px;
  height: 50px;
`

export const Qty = styled.div`
  padding: 0px 18px;
  margin: 0 8px;
  box-shadow: 0 1px 5px rgba(0,0,0,.2);
  display: inline-block;
  border-radius: 4px;
  @media only screen 
  and (max-device-width: 768px) {
    padding: 5px 25px;
    margin: 0 15px;
  }
`

export const PlusIcon = styled(Plus)`
  width: 19px;
  height: 19px;
  transition: all .2s ease;
  cursor: pointer;
  :hover {
    color: ${theme.secondaryColor};
  }
  :active {
    transform: scale(0.8);
  }
  @media only screen
  and (max-device-width: 768px) {
    width: 23px;
    height: 23px;
    :hover {
      color: inherit;
    }
    :active {
      transform: scale(0.8);
      color: ${theme.secondaryColor};
    }
  }
`

export const CloseIcon = styled(Close)`
  width: 20px;
  height: 20px;
  transition: all .2s ease;
  color: red;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const MinusIcon = styled(Minus)`
  width: 19px;
  height: 19px;
  transition: all .2s ease;
  cursor: pointer;
  :hover {
    color: ${theme.secondaryColor};
  }
  :active {
    transform: scale(0.8);
  }
  @media only screen
  and (max-device-width: 768px) {
    width: 23px;
    height: 23px;
    :hover {
      color: inherit;
    }
    :active {
      transform: scale(0.8);
      color: ${theme.secondaryColor};
    }
  }
`

export const BtnBlock = styled.div`
  padding: 20px 40px;
  margin: 10px 0 150px;
`

export const Button = styled.button`
  width: 220px;
  text-transform: uppercase;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px 0;
  background: ${theme.secondaryColor};
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  color: #FFF;
  border: 1px solid ${theme.secondaryColor};
  :focus {
    outline: none !important;
  }
  span {
    display: inline-block;
  }
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`

export const RemoveIcon = styled(TrashAlt)`
  position: absolute;
  width: 25px;
  height: 25px;
  color: ${theme.secondaryColor};
  right: 25px;
  bottom: 30px;
`;

export const MenuContainer = styled.div`
  position: absolute;
  height: 100%;
  background: #FFF;
  top: 0;
  left: -80%;
  width: 80%;
  z-index: 9;
  box-shadow: 0 0px 8px 0 rgba(133,123,123,.75);
  transition: all 0.3s ease-in-out;
  & > div:last-child {
    overflow-y: scroll;
    height: 100%;
  }
  & h2 {
    font-weight: normal;
    font-size: 30px;
    margin: 0;
    padding: 0;
    text-align: center;
  }
`

export const EmptyCartIcon = styled(ShoppingBag)`
  color: ${theme.secondaryColor};
  width: 100px;
  height: 100px;
  display: block;
  margin: 80px auto 20px;
`

export const Div = styled.div`
  position: relative;
  padding: 25px;
  h4 {
    font-weight: normal;
    font-size: 19px;
  }
  border-bottom: 1px solid #EAEAEA;
`

export const SubTotalBlock = styled.div`
  padding: 25px;
  h4 {
    font-weight: 700;
    font-size: 25px;
    margin: 0;
  }
  span {
    float: right;
  }
  border-bottom: 1px solid #EAEAEA;
`

export const LoaderIcon = styled(Loader4)`
  color: #FFF;
  width: 20px;
  height: 20px;
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: rotation 1.5s linear infinite;
`

export const ChangeAddress = styled.input`
  display: none;
  & ~ label:after {
    background-color: transparent;
  }
  
  &:checked ~ label:after {
    background-color: ${theme.secondaryColor} !important;
  }
`

export const ChangeAddressLabel = styled.label`
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  &:before {
    content: "";
    width: 15px;
    height: 15px;
    box-sizing: border-box;
    display: inline-block;
    border: 2px solid ${theme.secondaryColor};
    background-color: #FFF;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 2px;
  }
  &:after {
    content: "";
    width: 5px;
    height: 5px;
    box-sizing: border-box;
    display: inline-block;
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 0px;
    animation: all .5s ease;
  }
`;

export const TipInput = styled.input`
  border: none;
  border-bottom: 1px solid #333;
  animation: all 1.5s ease;
  padding: 0;
  margin: 0 4px;
  text-align: center;
  background: #FFF;
  width: 35px;
  :disabled {
    border-bottom: 1px solid #EAEAEA;
    background: transparent;
    box-shadow: none;
  }
`

export const ChangeAddressBlock = styled.div`
  padding: 25px 0px 10px 25px;
  & label {
    font-size: 20px;
    padding-left: 25px;
    padding-right: 10px;
  }
  & label:before {
    width: 18px;
    height: 18px;
  }
  & label:after {
    width: 6px;
    height: 6px;
    left: 6px;
  }
`
