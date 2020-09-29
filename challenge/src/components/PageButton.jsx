import React from "react";
import "./PageButton.css";

function PageButton(props) {
  return (
    <div>
      <button
        onClick={() => {
          props.lastPage();
        }}
      >
        Previous Page
      </button>
      <button
        onClick={() => {
          props.nextPage();
        }}
      >
        Next Page
      </button>
    </div>
  );
}

export default PageButton;