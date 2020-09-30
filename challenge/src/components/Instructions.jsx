import React from "react";
import "./Instructions.css";

function Instructions(props) {
    return (
        <div className="instructions">
            <h1>Welcome</h1>
            <p>
                To search for a restaurant with a particular name, in a certain city,
                or genre of food, enter all or a portion of the desired query into the
                "Search Term" field. Then select the category you'd like to search within.
                Once both fields are chosen, click the "Filter Results" button.
            </p>
        </div>
    )
}

export default Instructions;