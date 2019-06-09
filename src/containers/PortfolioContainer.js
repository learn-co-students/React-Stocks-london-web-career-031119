import React from 'react';
import Stock from '../components/Stock'

const PortfolioContainer = ({ stocks, removePortfolioStock }) =>
  <div>
    <h2>My Portfolio</h2>
    {stocks.map(stock =>
      <Stock
        key={'p' + stock.id}
        stock={stock}
        handleClick={() => removePortfolioStock(stock.ticker)} />)}
  </div>

export default PortfolioContainer;
