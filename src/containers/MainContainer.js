import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

const API = "http://localhost:3000/stocks";

class MainContainer extends Component {
  state = {
    stocks: [],
    portfolio: [],
    filterTerm: "",
    sortBy: "ticker"
  };

  fetchFromApi = () => fetch(API).then(resp => resp.json());
  saveApiDataToState = stocks => this.setState({ stocks });
  componentDidMount() {
    this.fetchFromApi().then(data => this.saveApiDataToState(data));
  }

  handleBuySellStock = stock => {
    let stocks = [...this.state.stocks];
    let portfolio = [...this.state.portfolio];

    if (stocks.find(s => s.id === stock.id)) {
      const selected = stocks.find(s => s.id === stock.id);
      const stockIndex = this.state.stocks.indexOf(selected);
      portfolio = portfolio.concat(stocks.splice(stockIndex, 1));
      this.setState({ stocks, portfolio });
    } else if (portfolio.find(s => s.id === stock.id)) {
      const selected = portfolio.find(s => s.id === stock.id);
      const stockIndex = this.state.portfolio.indexOf(selected);
      stocks = stocks.concat(portfolio.splice(stockIndex, 1));
      this.setState({ stocks, portfolio });
    }
  };

  handleSort = parameter => {
    let stocks = [...this.state.stocks];
    let portfolio = [...this.state.portfolio];

    const sortStocks = () =>
      stocks.sort((a, b) => {
        if (a[parameter] > b[parameter]) return 1;
        if (a[parameter] < b[parameter]) return -1;
        return 0;
      });

    const sortPortfolio = () =>
      portfolio.sort((a, b) => {
        if (a[parameter] > b[parameter]) return 1;
        if (a[parameter] < b[parameter]) return -1;
        return 0;
      });

    sortStocks();
    sortPortfolio();
    this.setState({ stocks, portfolio, sortBy: parameter });
  };

  handleFilter = value => this.setState({ filterTerm: value });

  render() {
    const filteredStocks = this.state.stocks.filter(stock =>
      stock.type.includes(this.state.filterTerm)
    );

    const filteredPortfolio = this.state.portfolio.filter(stock =>
      stock.type.includes(this.state.filterTerm)
    );

    return (
      <div>
        <SearchBar
          handleSort={parameter => this.handleSort(parameter)}
          handleFilter={value => this.handleFilter(value)}
          sortByValue={this.state.sortBy}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={filteredStocks}
              handleClick={stock => this.handleBuySellStock(stock)}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              stocks={filteredPortfolio}
              handleClick={stock => this.handleBuySellStock(stock)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
