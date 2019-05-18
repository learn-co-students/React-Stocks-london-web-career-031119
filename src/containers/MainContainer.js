import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
  }

  getStocks() {
    fetch('http://localhost:3000/stocks')
      .then(response => response.json())
      .then(stocks => this.setState({ stocks }))
      .catch(error => alert(error))
  }

  addToPortfolio = ticker => {
    const { portfolio, stocks } = this.state
    const myPortfolio = portfolio.slice()
    const myStock = stocks.filter(stock => stock.ticker === ticker)[0]
    myPortfolio.push(myStock)
    this.setState({ portfolio: myPortfolio });
  }

  removePortfolioStock = ticker => {
    const { portfolio } = this.state
    const myPortfolio = portfolio.slice()
    this.setState({ portfolio: myPortfolio.filter(stock => stock.ticker !== ticker) });
  }

  componentDidMount() {
    this.getStocks()
  }

  sortStocks = (value) => {
    const { stocks } = this.state
    const sortedStocks = stocks.slice()
    value === 'Alphabetically'
      ? sortedStocks.sort((a, b) => (a.ticker > b.ticker) ? 1 : -1)
      : sortedStocks.sort((a, b) => (a.price > b.price) ? 1 : -1)
    this.setState({ stocks: sortedStocks });
  }

  filterStocks = (value) => {
    const { stocks } = this.state
    const filteredStocks = stocks.slice()
    this.setState({ stocks: filteredStocks.filter(stock => stock.type === value) });
  }

  render() {
    const { stocks, portfolio } = this.state
    return (
      <div>
        <SearchBar handleSort={this.sortStocks} handleFilter={this.filterStocks} />

        <div className="row">
          <div className="col-8">
            <StockContainer addToPortfolio={this.addToPortfolio} stocks={stocks} />

          </div>
          <div className="col-4">

            <PortfolioContainer removePortfolioStock={this.removePortfolioStock} stocks={portfolio} />

          </div>
        </div>
      </div>
    );
  }

}

export default MainContainer;
