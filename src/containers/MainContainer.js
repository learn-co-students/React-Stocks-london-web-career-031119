import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
  state = {
    stocks: [],
    myPortfolio: []
  };

  fetchStocks = () =>
    fetch("http://localhost:3000/stocks").then(resp => resp.json());

  componentDidMount() {
    this.fetchStocks().then(stocks => this.setState({ stocks }));
  }

  addToPortfolio = stock => {
    if (!this.state.myPortfolio.includes(stock)) {
      this.setState({ myPortfolio: [...this.state.myPortfolio, stock] });
    }
  };

  removeFromPortfolio = stock => {
    if (this.state.myPortfolio.includes(stock)) {
      let newPortfolio = this.state.myPortfolio.filter(s => s !== stock);
      this.setState({ myPortfolio: newPortfolio });
    }
  };

  sortStocks = sort => {
    let operateStocks;
    this.state.filteredStocks
      ? (operateStocks = this.state.filteredStocks)
      : (operateStocks = this.state.stocks);
    let sortedStocks = this.state.stocks;
    if (sort == "Alphabetically") {
      sortedStocks = [...operateStocks].sort(function(a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (sort == "Price") {
      sortedStocks = [...operateStocks].sort(function(a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (a.price < b.price) {
          return 1;
        }
        return 0;
      });
    }
    this.setState({ filteredStocks: sortedStocks });
  };

  filterStocks = filter => {
    let filteredStocks;
    if (filter == "Tech") {
      filteredStocks = this.state.stocks.filter(stock => stock.type === "Tech");
    } else if (filter == "Sportswear") {
      filteredStocks = this.state.stocks.filter(
        stock => stock.type === "Sportswear"
      );
    } else if (filter == "Finance") {
      filteredStocks = this.state.stocks.filter(
        stock => stock.type === "Finance"
      );
    }
    this.setState({ filteredStocks });
  };

  render() {
    return (
      <div>
        <SearchBar
          sortStocks={this.sortStocks}
          filterStocks={this.filterStocks}
        />

        <div className="row">
          <div className="col-8">
            <StockContainer
              stocks={
                this.state.filteredStocks
                  ? this.state.filteredStocks
                  : this.state.stocks
              }
              handleClick={this.addToPortfolio}
            />
          </div>
          <div className="col-4">
            <PortfolioContainer
              myPortfolio={this.state.myPortfolio}
              handleClick={this.removeFromPortfolio}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContainer;
