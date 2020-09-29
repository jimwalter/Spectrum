import React from "react";
import "./App.css";
import data from "./data.json";
import Table from "./components/Table.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchResults: [],
      sortedResults: [],
      sortTerm: "",
    };
  }
  componentDidMount() {}
  getResults() {}
  updateSortTerm() {}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hello</p>
        </header>
        <body>
          <Table restaurants={data} />
        </body>
      </div>
    );
  }
}

export default App;
