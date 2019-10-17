import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { Container, SearchIcon, TextInput } from "./Components"

const Search = ({ currentRefinement, refine }) => (
  <Container>
    <SearchIcon />
    <TextInput
      type="search"
      placeholder="What are you looking for ?"
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
  </Container>
)

export default connectSearchBox(Search)