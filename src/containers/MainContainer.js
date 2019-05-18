import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    AllStocks: [],
    portfolio: [],
    searchTerm: ""
  };

  getStocks = () =>
    fetch("http://localhost:3001/stocks")
      .then(resp => resp.json())
      .then(stocks => this.setState({ stocks: stocks, AllStocks: stocks }));

  componentDidMount() {
    this.getStocks();
  }

  handleBuyStock = id => {
    const stocksCopy = [...this.state.stocks];
    const portfolioCopy = [...this.state.portfolio];

    const filter = stocksCopy.filter(stock => stock.id === id);

    const check = portfolioCopy.filter(stock => stock.id === id).shift();

    if (!check) {
      const portfolio = portfolioCopy.concat(filter);
      this.setState({ portfolio });
    }
  };

  handleSellStock = id => {
    const portfolioCopy = [...this.state.portfolio];

    const portfolio = portfolioCopy.filter(stock => stock.id !== id);

    this.setState({ portfolio });
  };

  handleSearch = event => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.updatedSearch();
    });
  };

  updatedSearch = () => {
    switch (this.state.searchTerm) {
      case "All":
        this.setState({ stocks: this.state.AllStocks });
        break;

      case "Price":
        let price = [...this.state.stocks];
        price = price.sort((a, b) => {
          return b.price - a.price;
        });
        this.setState({ stocks: price });
        break;

      case "Alphabetically":
        let alpha = [...this.state.stocks];
        alpha = alpha.sort((a, b) => a.name.localeCompare(b.name));
        this.setState({ stocks: alpha });
        break;

      default:
        const stocks = this.state.AllStocks.filter(
          stock => stock.type === this.state.searchTerm
        );
        this.setState({ stocks });
    }
  };

  render() {
    return (
      <div>
        <SearchBar
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={this.state.stocks}
              handleBuyStock={this.handleBuyStock}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              portfolio={this.state.portfolio}
              handleSellStock={this.handleSellStock}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
