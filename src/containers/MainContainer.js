import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const URL = "http://localhost:3000/stocks"

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filter: 'Tech',
    sortBy: 'Alphabetically'
  }

  componentDidMount() {
    fetch(URL)
      .then(resp => resp.json())
      .then(stocks => this.setState( { stocks } ))
  }

  handleFilter = filter => this.setState( { filter } )

  handleSortBy = sortBy => this.setState( { sortBy } )

  handleStocks = stock => {
    if (this.state.portfolio.includes(stock)) return
    const portfolio = [...this.state.portfolio].concat(stock)
    this.setState( { portfolio } )
  }

  handlePortfolio = ({ id }) => {
    const portfolio = this.state.portfolio.filter(stock => stock.id !== id);
    this.setState( { portfolio } )
  }

  stocksFiltered = () => {
    const { stocks, filter, sortBy } = this.state;
    return stocks
      .filter(stock => stock.type === filter)
      .sort((a, b) => sortBy === 'Alphabetically'
        ? a.ticker.localeCompare(b.ticker)
        : a.price - b.price
      )
  }

  render() {
    const { portfolio, filter, sortBy } = this.state;
    const { handleFilter, handleSortBy, handleStocks, handlePortfolio, stocksFiltered } = this
    return (
      <div>
        <SearchBar 
          filter={filter}
          sortBy={sortBy}
          handleFilter={handleFilter}
          handleSortBy={handleSortBy}
        />
        <div className="row">
          <div className="col-8">
            <StockContainer 
              stocks={stocksFiltered()}
              handleStockClick={handleStocks}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer 
              portfolio={portfolio} 
              handleStockClick={handlePortfolio}
            />
          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
