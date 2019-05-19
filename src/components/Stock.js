import React from 'react'

const Stock = ({ stock, handleStockClick }) => {
  const handleClick = () => handleStockClick(stock)
  return (
    <div className="card" onClick={handleClick} >
      <div className="card-body">
        <h5 className="card-title">
          {stock.name}
        </h5>
        <p className="card-text">
          {stock.price}
        </p>
      </div>
    </div>
  )
};

export default Stock
