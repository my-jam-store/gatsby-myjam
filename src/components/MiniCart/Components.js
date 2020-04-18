import styled from "styled-components"
import { Cart } from "styled-icons/evil/Cart"
import { Plus } from "styled-icons/boxicons-regular/Plus"
import { Minus } from "styled-icons/boxicons-regular/Minus"
import theme from "../../theme"

export const Content = styled.div`
  background-color: #FBFCFF;
  box-shadow: 0 1px 6px 3px rgba(0,0,0,.5);
  padding: 25px;
  border-radius: 5px;
  height: 85vh;
  overflow-y: scroll;
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
    transform: scale(0.8)
  }
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
    transform: scale(0.8)
  }
`

export const Button = styled.button`
  width: 100%;
  height: 100%;
  text-transform: uppercase;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 3px;
  cursor: pointer;
  padding: 10px 26px;
  background: ${theme.secondaryColor};
  box-shadow: 0 1px 6px 0 rgba(133,123,123,.75);
  color: #FFF;
  border: 1px solid ${theme.secondaryColor};
  :focus {
    outline: none !important;
  }
`