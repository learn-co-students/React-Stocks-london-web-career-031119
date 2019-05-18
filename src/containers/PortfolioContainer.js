import React, { Component } from "react";
import Portfolio from "../components/Portfolio";

class PortfolioContainer extends Component {
  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolio.map(stock => (
          <Portfolio
            key={stock.id}
            stock={stock}
            handleSellStock={this.props.handleSellStock}
          />
        ))}
      </div>
    );
  }
}

export default PortfolioContainer;
