import React from "react"
import { Container, TextInput, SearchIcon } from "./Components"

// TODO working on algolia integration.

const SearchBox = () => {
  return (
    <Container>
      <SearchIcon />
      <TextInput placeholder={`What are you looking for ?`} />
    </Container>
  )
}

export default SearchBox