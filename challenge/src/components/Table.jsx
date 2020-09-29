import React from "react";
import "./Table.css";

function Table(props) {
  const { restaurants } = props;
  return (
    <table>
      <caption>Our restaurants</caption>
      <thead>
        <tr>
          <th>Name</th>
          <th>City</th>
          <th>State</th>
          <th>Phone Number</th>
          <th>Genres</th>
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
