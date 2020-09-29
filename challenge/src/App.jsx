import React from "react";
import "./App.css";
import data from "./data.json";
import Table from "./components/Table.jsx";
import PageButton from "./components/PageButton.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchResults: data,
      sortedResults: [],
      currentPageResults: [],
      sortTerm: "name",
      currentPage: 0,
    };
    this.getResults = this.getResults.bind(this);
    this.updateSortTerm = this.updateSortTerm.bind(this);
    this.updatePageShown = this.updatePageShown.bind(this);
    // this.nextPage = this.nextPage.bind(this);
    // this.lastPage = this.lastPage.bind(this);
  }
  componentDidMount() {

  }

  getResults() {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => console.log("ERROR: " + error));
  }

  sortResults(term) {
    let sortedRestaurants = this.state.fetchResults;
    sortedRestaurants.sort((a, b) => {
      if (a[term] < b[term]) {
        return -1;
      }
      if (a[term] > b[term]) {
        return 1;
      }
      return 0;
    });
    this.setState(
      {
        sortedResults: sortedRestaurants,
      },
      () => {
        console.log("UPDATING PAGE SHOWN");
        // this.updatePageShown();
      }
    );
  }

  updateSortTerm() { }

  updatePageShown() {
    let paginatedResults = this.state.sortedResults.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    console.log(paginatedResults);
    this.setState({
      currentPageResults: paginatedResults,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Hello</p>
        </header>
        <main>
          <button onClick={() => {
            console.log("getResults");
            this.getResults();
          }}>CLICK IT</button>
          <Table restaurants={this.state.currentPageResults} />
          <PageButton nextPage={this.nextPage} lastPage={this.lastPage} />
        </main>
      </div>
    );
  }
}

export default App;

// nextPage() {
//   console.log("Before setState: " + this.state.currentPage);
//   this.setState(
//     {
//       currentPage: this.state.currentPage++,
//     },
//     console.log("AFTER setState: " + this.state.currentPage)
//   );
// }

// lastPage() {
//   let currentPageState = this.state.currentPage;
//   console.log("Before setState: " + this.state.currentPage);
//   this.setState(
//     {
//       currentPage: this.state.currentPage--,
//     },
//     console.log("AFTER setState: " + this.state.currentPage)
//   );
// }
