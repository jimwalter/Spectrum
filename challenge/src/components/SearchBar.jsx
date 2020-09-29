import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
    return (
        <div className="searchBar">
            <form>
                <label htmlFor="filter">Search term: </label><br />
                <input type="text" id="filter" name="filter" placeholder="Search..." onChange={props.handleFilterChange} required /><br />
                <label htmlFor="category">Category: </label><br />
                <select onChange={props.handleCategorySelect} name="category" required>
                    <option value="" selected data-default>Please Choose A Category</option>
                    {props.categories.map(category => (
                        <option key={category.key} value={`${category.name}`}>{category.name}</option>
                    ))}
                </select>
                <br />
                <input id="submit" type="submit" name="filter" value="Filter Results" onClick={props.handleFormSubmit} /><br />
                <button onClick={props.getResults}>
                    Clear Search Results
          </button><br />
            </form>
        </div>
    )
};

export default SearchBar;