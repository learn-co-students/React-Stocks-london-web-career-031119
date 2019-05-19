import React from 'react';

const SearchBar = ({ handleFilter, handleSort }) =>
  <div>
    <strong>Sort by:</strong>
    <label>
      <input
        type="radio"
        value="Alphabetically"
        name="sortRadio"
        onChange={
          (e) => {
            handleSort(e.target.value)
          }
        } />
      Alphabetically
      </label>
    <label>
      <input
        type="radio"
        value="Price"
        name="sortRadio"
        onChange={
          (e) => {
            handleSort(e.target.value)
          }
        } />
      Price
      </label>
    <br />

    <label>
      <strong>Filter:</strong>
      <select onChange={(e) => handleFilter(e.target.value)}>
        <option selected value="All">All</option>
        <option value="Tech">Tech</option>
        <option value="Sportswear">Sportswear</option>
        <option value="Finance">Finance</option>
      </select>
    </label>

  </div>



export default SearchBar;
