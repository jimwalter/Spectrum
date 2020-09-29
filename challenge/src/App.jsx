import React from "react";
import "./App.css";
import Table from "./components/Table.jsx";
import PageButton from "./components/PageButton.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchResults: [],
      sortedResults: [],
      currentPageResults: [],
      sortTerm: "name",
      currentPage: 0,
    };
    this.getResults = this.getResults.bind(this);
    this.updateSortTerm = this.updateSortTerm.bind(this);
    this.updatePageShown = this.updatePageShown.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            fetchResults: data
          })
      })
      .then(() => {
        this.sortResults();
      })
      .catch((error) => console.log("ERROR: " + error));
  }

  sortResults() {
    let sortedRestaurants = this.state.fetchResults;
    let term = this.state.sortTerm;
    sortedRestaurants.sort((a, b) => {
      if (a[term] < b[term]) {
        return -1;
      }
      if (a[term] > b[term]) {
        return 1;
      }
      return 0;
    });

    this.setState({
      sortedResults: sortedRestaurants
    }, () => {
      this.updatePageShown();
    })

  }

  updateSortTerm(term) {
    console.log(term);
    this.setState({
      sortTerm: term
    }, () => {
      this.sortResults();
    })
  }

  updatePageShown() {
    let paginatedResults = this.state.sortedResults.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    this.setState({
      currentPageResults: paginatedResults,
    });
  }

  nextPage() {
    let nextPage = this.state.currentPage + 1;
    this.setState(
      {
        currentPage: nextPage,
      },
      () => {
        this.updatePageShown();
      })
  }

  lastPage() {
    let lastPage = this.state.currentPage - 1;
    this.setState(
      {
        currentPage: lastPage,
      },
      () => {
        this.updatePageShown();
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p></p>
        </header>
        <main>
          <button onClick={() => {
            this.getResults();
          }}>
            Get Restaurants
          </button>
          <Table
            restaurants={this.state.currentPageResults}
            updateSortTerm={this.updateSortTerm}
          />
          <PageButton
            nextPage={this.nextPage}
            lastPage={this.lastPage}
          />
        </main>
      </div>
    );
  }
}

export default App;