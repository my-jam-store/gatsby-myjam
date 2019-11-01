import React from "react"
import { connectStateResults } from "react-instantsearch-dom"
import Hits from "./Hits"

const SearchResult = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? <Hits /> : <></>
)

export default SearchResult