import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const stocksURL = "http://localhost:3001/stocks"

class MainContainer extends Component {

  state = {
    stocks: [],
    filter: "",
    sortBy: "Default",
    portfolio: []
  }

  getStocks = () => {
    return fetch(stocksURL)
      .then(resp => resp.json())
  }

  getFilteredAndSortedStocks = () => {
    const { stocks, filter, sortBy } = this.state
    let filteredStocks = [...stocks]

    // first lets sort
    if (sortBy === "Alphabetically") {
      filteredStocks = filteredStocks.sort((a, b) => {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
        return 0
      })
    } else if (sortBy === "Price") {
      filteredStocks = filteredStocks.sort((a, b) => b.price - a.price)
    }

    // now lets filter
    return filter
      ? filteredStocks.filter(stock => stock.type === filter)
      : filteredStocks
  }

  handleFilterChange = (event) => {
    const filter = event.target.value
    this.setState({ filter })
  }

  handleSortChange = (event) => {
    const sortBy = event.target.value
    this.setState({ sortBy })
  }

  handleStockClick = stock => {
    if (!this.state.portfolio.includes(stock)) {
      const portfolio = [...this.state.portfolio, stock]
      this.setState({ portfolio })
    }
    else {
      const portfolio = this.state.portfolio.filter(s => s.id !== stock.id)
      this.setState({ portfolio })
    }
  }

  componentDidMount() {
    this.getStocks()
      .then(stocks => this.setState({ stocks }))
  }

  render() {
    return (
      <div>
        <SearchBar
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange} />

        <div className="row">
          <div className="col-8">

            <StockContainer
              handleStockClick={this.handleStockClick}
              stocks={this.getFilteredAndSortedStocks()} />

          </div>
          <div className="col-4">

            <PortfolioContainer
              portfolio={this.state.portfolio}
              handleStockClick={this.handleStockClick}
            />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
