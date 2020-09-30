import React from "react";
import "./App.css";

import SearchBar from "./components/SearchBar.jsx";
import Table from "./components/Table.jsx";
import PageButton from "./components/PageButton.jsx";

require('dotenv').config();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [{
        name: "Name",
        key: 1
      }, {
        name: "City",
        key: 2
      }, {
        name: "Genre",
        key: 3
      }],
      fetchResults: [],
      sortedResults: [],
      currentPageResults: [],
      sortTerm: "name",
      currentPage: 0,
      maxPage: 0,
      filterTerm: "",
      category: "",
      filterResults: [],
    };

    this.getResults = this.getResults.bind(this);
    this.sortResults = this.sortResults.bind(this);
    this.updateSortTerm = this.updateSortTerm.bind(this);
    this.updatePageShown = this.updatePageShown.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.lastPage = this.lastPage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // automatically fetch data
    this.getResults();
  }

  getResults(e) {
    // e.preventDefault();
    fetch('https://code-challenge.spectrumtoolbox.com/api/restaurants', {
      headers: {
        Authorization: process.env.REACT_APP_TOKEN,
      },
    })
      .then(response => response.json())
      .then(data => {
        let pages = data.length / 10;
        this.setState(
          {
            fetchResults: data,
            maxPage: pages
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
    this.setState({
      sortTerm: term
    }, () => {
      this.sortResults();
    })
  }

  updatePageShown(restaurantArray = this.state.sortedResults) {
    let paginatedResults = restaurantArray.slice(
      this.state.currentPage * 10,
      (this.state.currentPage + 1) * 10
    );
    this.setState({
      currentPageResults: paginatedResults,
    });
  }

  nextPage() {
    let nextPage = this.state.currentPage + 1;
    let maxPage_ = this.state.maxPage;
    if (nextPage <= maxPage_) {
      this.setState(
        {
          currentPage: nextPage,
        },
        () => {
          this.updatePageShown();
        })
    }
  }

  lastPage() {
    let lastPage = this.state.currentPage - 1;
    if (lastPage >= 0) {
      this.setState(
        {
          currentPage: lastPage,
        },
        () => {
          this.updatePageShown();
        })
    }
  }

  handleFilterChange(e) {
    this.setState({
      filterTerm: e.target.value.toLowerCase(),
    })
  }

  handleCategorySelect(e) {
    this.setState({
      category: e.target.value.toLowerCase(),
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let term = this.state.filterTerm;
    let cat = this.state.category;
    if (term && cat) {

      let tempResults = this.state.fetchResults
        .filter((restaurant) => restaurant[cat].toLowerCase().includes(term.toLowerCase()));

      this.setState({
        filterResults: tempResults,
      }, () => {
        this.updatePageShown(this.state.filterResults);
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p></p>
        </header>
        <main>

          <SearchBar
            getResults={this.getResults}
            handleFilterChange={this.handleFilterChange}
            categories={this.state.categories}
            handleCategorySelect={this.handleCategorySelect}
            handleFormSubmit={this.handleFormSubmit}
          />
          <Table
            restaurants={this.state.currentPageResults}
            updateSortTerm={this.updateSortTerm}
          />
          <PageButton
            pageNum={this.state.currentPage + 1}
            nextPage={this.nextPage}
            lastPage={this.lastPage}
          />
        </main>
      </div>
    );
  }
}

export default App;