import React from "react";

const Portfolio = props => (
  <div>
    <div className="card" onClick={() => props.handleSellStock(props.stock.id)}>
      <div className="card-body">
        <h5 className="card-title">{props.stock.name}</h5>
        <p className="card-text">{props.stock.price}</p>
      </div>
    </div>
  </div>
);

export default Portfolio;
