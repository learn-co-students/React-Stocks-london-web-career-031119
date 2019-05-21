import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <form onChange={props.handleSortChange}>
        <input type="radio" name="gender" value="Default" /> Default
        <input type="radio" name="gender" value="Price" /> Price
        <input type="radio" name="gender" value="Alphabetically" /> Alphabetically
      </form>

      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.handleFilterChange}>
          <option value="">No filter</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
