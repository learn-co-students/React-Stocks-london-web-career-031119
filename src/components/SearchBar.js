import React from 'react';

const SearchBar = props => {
  const { sortBy, filter, handleSortBy, handleFilter } = props
  const handleRadioChange = event => handleSortBy(event.target.value)
  const handleSelectChange = event => handleFilter(event.target.value)
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={sortBy === "Alphabetically" ? true : false} onChange={handleRadioChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={sortBy === "Price" ? true : false} onChange={handleRadioChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={handleSelectChange} value={filter} >
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
