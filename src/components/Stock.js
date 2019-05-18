import React from 'react'

const Stock = ({ stock, handleClick }) =>
  <div>
    {console.log(stock)}
    <div className="card" onClick={handleClick}>
      <div className="card-body">
        <a className="card-title">
          {stock.name}
        </a>
        <p className="card-text">
          {stock.price}
        </p>
      </div>
    </div>
  </div>

export default Stock
