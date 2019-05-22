import React, { Component } from "react";

class SearchBar extends Component {
  state = {
    filter: false
  };

  handleChange = e => {
    e.persist();
    this.setState({ filter: !this.state[e.target.value] });
    this.props.sortStocks(e.target.value);
  };

  handleFilter = e => {
    this.props.filterStocks(e.target.value);
  };

  render() {
    return (
      <div>
        <strong>Sort by:</strong>
        <label>
          <input
            name="filter"
            type="radio"
            value="Alphabetically"
            checked={this.state.Alphabetically}
            onChange={this.handleChange}
          />
          Alphabetically
        </label>
        <label>
          <input
            name="filter"
            type="radio"
            value="Price"
            checked={this.state.Price}
            onChange={this.handleChange}
          />
          Price
        </label>
        <br />

        <label>
          <strong>Filter:</strong>
          <select onChange={this.handleFilter}>
            <option value="Tech">Tech</option>
            <option value="Sportswear">Sportswear</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
      </div>
    );
  }
}

export default SearchBar;
