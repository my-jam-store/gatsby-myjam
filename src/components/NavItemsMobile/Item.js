import React, { useState } from "react"
import { Item, ArrowDown } from "./Components"
import SubItems from "./SubItems"

export default ({ title, subCategories, id }) => {
  const [ isOpen, setSubItemState ] = useState(false)

  const handleSubItemStatus = () => {
    setSubItemState(!isOpen)
  }

  return (
    <Item data-id={id} onClick={handleSubItemStatus}>
      <span>{title}</span>
      <ArrowDown className={isOpen && 'rotate'} />
      <SubItems categories={subCategories} isOpen={isOpen} />
    </Item>
  )
}