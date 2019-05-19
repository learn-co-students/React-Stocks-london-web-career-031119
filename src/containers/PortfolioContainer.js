import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  render() {
    const { portfolio, handleStockClick } = this.props
    return (
      <div>
        <h2>My Portfolio</h2>
          {portfolio.map(stock =>
            <Stock key={stock.id} stock={stock} handleStockClick={handleStockClick} />
          )}
      </div>
    );
  }

}

export default PortfolioContainer;
