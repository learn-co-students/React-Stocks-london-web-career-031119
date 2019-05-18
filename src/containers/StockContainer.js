import React from 'react';
import Stock from '../components/Stock'

const StockContainer = ({ addToPortfolio, stocks }) =>
  <div>
    <h2>Stocks</h2>
    {
      stocks.map(stock =>
        <Stock key={stock.id} stock={stock} handleClick={() => addToPortfolio(stock.ticker)} />)
    }
  </div>


export default StockContainer;
