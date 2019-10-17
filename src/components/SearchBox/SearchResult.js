import React from "react"
import { connectStateResults, Hits } from "react-instantsearch-dom"
import Product from "./Product"

const SearchResult = connectStateResults(
  ({ searchState }) =>
    searchState && searchState.query ? <Hits hitComponent={Product} /> : <span></span>
)

export default SearchResult