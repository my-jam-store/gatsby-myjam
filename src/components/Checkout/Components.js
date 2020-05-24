import styled from "styled-components"
import theme from "../../theme"


export const LogoBlock = styled.div`
  width: 100%;
  background-color: #FFF;
  border-bottom: 1px solid #F3F3FF;
  text-align: center;
  padding: 15px;
  box-sizing: border-box;
  line-height: 0;
  & a {
    height: 45px;
    display: inline-block;
  }
  & .gatsby-image-wrapper {
    width: 45px;
    display: inline-block;
  }
`

export const PageContainer = styled.div`
  background-color: #F8FbFb;
  display: grid;
  grid-template-columns: auto 28%;
  height: 100vh;
  @media only screen 
  and (max-device-width: 768px) {
    display: block;
    height: 100%;
  }
`

export const SummaryBlock = styled.div`
  background-color: #FFF;
  box-shadow: 0 2px 23px 2px rgba(0, 0, 0, 0.12);
  overflow-y: scroll;
  & h3 {
    color: #333;
    font-size: 25px;
    padding: 25px 20px;
    height: 76px;
    font-weight: 500;
    margin: 0;
    border-bottom: 1px solid #EAEAEA;
  }
  @media only screen 
  and (max-device-width: 768px) {
    background-color: #F8FbFb;
    box-shadow: none;
    margin: 0 auto;
    width: 100%;
    border: none;
    padding: 0 10px;
    & h3 {
      margin: 0;
      padding: 15px 0;
      font-weight: normal;
      text-transform: uppercase;
      font-size: 14px;
      height: auto;
      border: none;
    }
    & > span {
      position: absolute;
      background-color: #F8FbFb;
      padding: 5px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  & svg.rotate {
    transform: rotate(-180deg);
  }
`

export const ItemsGrid = styled.div`
  display: grid;
  padding: 20px;
  grid-auto-flow: row;
  grid-gap: 20px;
  border-bottom: 1px solid #EAEAEA;
  transition: all 0.5s ease;
  @media only screen 
  and (max-device-width: 768px) {
    padding: 12px;
    grid-gap: 12px;
    background-color: #FFF;
    border: 1px solid #EAEAEA;
    max-height: auto;
    overflow: hidden;
    &.show-less {
      max-height: 135px;
    }
    &.show-more {
      max-height: 1000px;
    }
  }
`
export const Item = styled.div`
  display: grid;
  grid-template-columns: 75px auto 1fr;
  grid-gap: 10px;
  align-items: flex-start;
  & span {
    font-size: 15px;
    line-height: 1.3;
  }
  & .price {
    text-align: right;
  }
  & .total-price {
    font-size: 23px;
    font-weight: 500;
    color: ${theme.secondaryColor};
  }
  & img {
    max-width: 100%;
    width: 100%;
    border-radius: 4px;
  }
  @media only screen 
  and (max-device-width: 768px) {
    grid-template-columns: auto 100px;
  }
`

export const Block = styled.div`
  padding: 20px;
  & div {
    display: flex;
    justify-content: space-between;
  }
  & div:not(:first-child) {
    padding-top: 7px;
  }
  @media only screen 
  and (max-device-width: 768px) {
    padding: 20px 2px;
  }
`

export const Discount = styled.div`
  border-top: 1px solid #EAEAEA;
  border-bottom: 1px solid #EAEAEA;
  padding: 20px;
  display: flex;
  font-size: 15px;
  justify-content: space-between;
  position: relative;
  @media only screen 
  and (max-device-width: 768px) {
    padding: 20px 0;
  }
  & p {
    position: absolute;
    bottom: 0;
    margin: 0;
    left: 20px;
    color: red;
  }
  & button {
    width: 120px;
    padding: 5px 10px;
    border-radius: 5px;
    transition: all .3s ease-out;
    background-color: ${theme.secondaryColor};
    color: #FFF;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }
  & input {
    padding: 5px 10px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid #EAEAEA;
    transition: all .3s ease;
    &:active, &:focus {
      outline: none;
      border-color: ${theme.secondaryColor};
    }
    &:read-only {
      background-color: #EAEAEA;
      border-color: #EAEAEA !important;
      color: #A7A7A7;
      cursor: default;
    }
    ${(props) => props.error && 'border-color: red !important'}
  }
`
export const TotalBlock = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  & span {
    font-size: 26px;
  }
  @media only screen 
  and (max-device-width: 768px) {
    padding: 15px 0;
    & span {
      font-size: 23px;
    }
  }
`

export const FormWrapper = styled.form`
  width: 550px;
  border: 1px solid #e1dede;
  border-radius: 4px;
  padding: 25px 35px;
  margin: 40px auto 0;
  position: relative;
  @media only screen 
  and (max-device-width: 768px) {
    margin: 0 auto 50px;
    width: 100%;
    border: none;
    padding: 10px;
  }
  & > p {
    margin-bottom: 0;
    background: #F8FBFB;
    top: -14px;
    left: 50%;
    font-size: 16px;
    transform: translateX(-50%);
    padding: 0 10px;
    width: fit-content;
    display: inline-block;
    position: absolute;
    @media only screen 
    and (max-device-width: 768px) {
      display: none;
    }
  }
  & section {
    margin-bottom: 20px;
    & h4 {
      margin: 0;
      padding: 15px 0;
      font-weight: normal;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 1px;
      color: #000;
    }
    & fieldset {
      margin-bottom: 10px;
      background: #FFF;
      box-shadow: 0 1px 3px 0 rgba(50, 50, 93, 0.15), 0 4px 6px 0 rgba(112, 157, 199, 0.15);
      border-radius: 4px;
      border: none;
      & label {
        transition: all .3s ease-out;
        position: relative;
        display: flex;
        flex-direction: row;
        height: 42px;
        padding: 10px 25px;
        align-items: center;
        font-size: 15px;
        justify-content: center;
        color: #8898aa;
        font-weight: 400;
        @media only screen 
        and (max-device-width: 768px) {
          padding: 10px;
        }
        & span {
          transition: all .3s ease-out;
          color: #525F7F;
          min-width: 100px;
          padding: 0 15px;
          text-align: right;
        }
        & > input, & > div {
          flex: 1;
          padding: 0 14px;
          background: transparent;
          font-weight: 400;
          color: #31325f;
          outline: none;
          cursor: text;
          border: none;
        }
      }
      & label:not(:last-child) {
        border-bottom: 1px solid #F0F5FA;
      }
      & .error {
        border-color: red !important;
        & span {
          color: red;
        }
        & p {
          font-size: 13px;
          position: absolute;
          right: 15px;
          color: red;
          margin: 0;
        }
      }
      & #stripe-card-element {
        @media only screen 
        and (max-device-width: 768px) {
          & span {
            display: none;
          }
        }
      }
      & #stripe-card-element.error {
        & span {
          color: red;
        }
        & p {
          font-size: 13px;
          position: absolute;
          right: 5px;
          top: -30px;
          color: red;
          margin: 0;
          @media only screen 
          and (max-device-width: 768px) {
            top: -20px;
          }
        }
      }
    }
  }
  & button {
    display: block;
    background: ${theme.secondaryColor};
    color: #fff;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    border: 0;
    font-weight: 600;
    letter-spacing: 1px;
    width: 100%;
    height: 40px;
    outline: none;
    cursor: pointer;
    transition: all 0.15s ease;
    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
    & span {
      padding: 0 10px;
    }
  }
`
