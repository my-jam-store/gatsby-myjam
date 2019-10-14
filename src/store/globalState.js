import React, { createContext } from "react"

export const GlobalStateContext = createContext({
  cursor: 0,
  isInitializing: () => { return true },
  updateState: () => {},
  hasMore: () => {},
  loadMore: () => {}
});

export class GlobalState extends React.Component {
  constructor(props) {
    super(props)

    this.loadMore       = this.loadMore.bind(this)
    this.hasMore        = this.hasMore.bind(this)
    this.updateState    = this.updateState.bind(this)
    this.isInitializing = this.isInitializing.bind(this)

    this.state = {
      cursor: 0,
      useInfiniteScroll: true,
      isInitializing: this.isInitializing,
      updateState: this.updateState,
      hasMore: this.hasMore,
      loadMore: this.loadMore,
    }
  }

  isInitializing = () => {
    return (this.state.cursor === 0)
  }

  updateState = (mergeAbleStateObject) => {
    this.setState(mergeAbleStateObject)
  }

  loadMore = (pageContext) => {
    const pageNum = this.state.cursor
    this.setState(state => ({ cursor: state.cursor + 1 }))
    fetch(`${__PATH_PREFIX__}/paginationJson/${pageContext.slug}${pageNum}.json`)
      .then(res => res.json())
      .then(
        res => {
          this.setState({ ["page"+pageNum]: res })
        },
        error => this.setState({ useInfiniteScroll: false })
      )
  }

  hasMore = (pageContext) => {
    if (!this.state.useInfiniteScroll) return false
    if (this.isInitializing()) return true
    return this.state.cursor <= pageContext.countPages
  }

  render() {
    return (
      <GlobalStateContext.Provider value={this.state}>
        {this.props.children}
      </GlobalStateContext.Provider>
    )
  }

}