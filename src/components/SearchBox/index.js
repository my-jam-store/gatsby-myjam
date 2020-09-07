import React from "react"
import algoliasearch from "algoliasearch/lite"
import { InstantSearch, Configure } from "react-instantsearch-dom"
import Search from "./Search"
import SearchResult from "./SearchResult"
import { Wrapper } from "./Components"

const searchClient = algoliasearch(`${process.env.GATSBY_ALGOLIA_APP_ID}`, `${process.env.GATSBY_ALGOLIA_SEARCH_KEY}`)

export default () => (
  <Wrapper>
    <InstantSearch searchClient={searchClient} indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}>
      <Configure hitsPerPage={30} />
      <Search />
      <SearchResult />
    </InstantSearch>
  </Wrapper>
);
