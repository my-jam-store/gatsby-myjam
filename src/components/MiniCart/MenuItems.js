import React, { useContext } from "react"
import { MinusIcon, PlusIcon, Qty, Text, RemoveIcon, Div } from "./Components"
import AppContext from "../../store/context"
import { removeItemAction, updateItemQtyAction } from "../../store/actions"

const MenuItems = ({ item }) => {
  const { dispatch } = useContext(AppContext)

  const getItemTotal = () => {
    const amount = Number(item.price) * 100 * item.qty;
    return (amount/100).toFixed(2);
  }

  const handleQtyDec = () => {
    if(item.qty > 1) {
      dispatch(updateItemQtyAction(item.id, item.qty-1))
    }
  }

  const handleQtyInc = () => {
    dispatch(updateItemQtyAction(item.id, item.qty+1))
  }

  const handleItemRemove = () => {
    dispatch(removeItemAction(item.id))
  }

  return (
    <Div key={item.id}>
      <h4>{item.name}</h4>
      <h4>&#163;{getItemTotal()}</h4>
      <div>
        <MinusIcon onClick={handleQtyDec} />
        <Qty>
          <Text>{item.qty}</Text>
        </Qty>
        <PlusIcon onClick={handleQtyInc} />
      </div>
      <RemoveIcon onClick={handleItemRemove} />
    </Div>
  )
}

export default MenuItems