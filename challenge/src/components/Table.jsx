import React from "react";
import "./Table.css";

function Table(props) {
  const { restaurants } = props;
  return (
    <table>
      <caption>Our restaurants</caption>
      <thead>
        <tr>
          <th>
            <button onClick={() => { props.updateSortTerm("name") }}>Name</button>
          </th>
          <th>
            <button onClick={() => { props.updateSortTerm("city") }}>City</button>
          </th>
          <th>
            <button onClick={() => { props.updateSortTerm("state") }}>State</button>
          </th>
          <th>
            <button>Phone Number</button>
          </th>
          <th>
            <button onClick={() => { props.updateSortTerm("genre") }}>Genres</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant) => (
          <tr key={restaurant.id}>
            <td>{restaurant.name}</td>
            <td>{restaurant.city}</td>
            <td>{restaurant.state}</td>
            <td>{restaurant.telephone}</td>
            <td>{restaurant.genre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
