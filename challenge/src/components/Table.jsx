import React from "react";
import "./Table.css";

function Table(props) {
  const { restaurants } = props;
  return (
    <div className="table-section">

      <table>
        <caption>Restaurant Results</caption>
        <thead>
          <tr>
            <th onClick={() => { props.updateSortTerm("name") }}>Name</th>
            <th onClick={() => { props.updateSortTerm("city") }}>City</th>
            <th onClick={() => { props.updateSortTerm("state") }}>State</th>
            <th>Phone Number</th>
            <th onClick={() => { props.updateSortTerm("genre") }}>Genres</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td className="table-name">{restaurant.name}</td>
              <td className="table-city">{restaurant.city}</td>
              <td className="table-state">{restaurant.state}</td>
              <td className="table-telephone">{restaurant.telephone}</td>
              <td className="table-genre">{restaurant.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
