import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card">
      <div className="card-body">
        <h5 
          id={props.stock.id} 
          className="card-title" 
          onClick={props.handleAddandDeleteStockToMyPortfolio}
        > 
          {props.stock.name} 
        </h5>
        <p className="card-text">{props.stock.price}</p>
      </div>
    </div>
  </div>
);

export default Stock
