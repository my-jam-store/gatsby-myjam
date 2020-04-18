import React, { useContext } from "react"
import { MinusIcon, PlusIcon, Qty, Text, Track, Wrapper, CloseIcon } from "./Components"
import AppContext from "../../store/context"
import { removeItemAction, updateItemQtyAction } from "../../store/actions"

const Item = ({ item }) => {
  const { state, dispatch } = useContext(AppContext)
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
    <Wrapper>
      <Track>
        <Text>{item.name}</Text>
      </Track>
      <Track>
        <MinusIcon onClick={handleQtyDec} />
        <Qty>
          <Text>{item.qty}</Text>
        </Qty>
        <PlusIcon onClick={handleQtyInc} />
      </Track>
      <Track>
        <Text>&#163;{item.price}</Text>
      </Track>
      <Track>
        <Text>&#163;{getItemTotal()}</Text>
        <CloseIcon onClick={handleItemRemove} />
      </Track>
    </Wrapper>
  )
}

export default Item