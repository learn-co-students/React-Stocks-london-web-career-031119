import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  render() {
    return (
      <div>
        <SearchBar
          handleSortStocks={this.props.handleSortStocks}
          handleFilterStocks={this.props.handleFilterStocks}
          handleFilterToggled={this.props.handleFilterToggled}

        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                stocks={this.props.stocks}
                handleAddandDeleteStockToMyPortfolio={this.props.handleAddandDeleteStockToMyPortfolio}
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                handleAddandDeleteStockToMyPortfolio={this.props.handleAddandDeleteStockToMyPortfolio}
                portfolio={this.props.portfolio}

              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
