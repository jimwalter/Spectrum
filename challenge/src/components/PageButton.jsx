import React from "react";
import "./PageButton.css";

function PageButton(props) {
  return (
    <div className="pageButton">
      <button
        className="buttonOne"
        onClick={() => {
          props.lastPage();
        }}
      >
        Previous Page
      </button>
      <p>
        page {props.pageNum}
      </p>
      <button
        className="buttonTwo"
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
