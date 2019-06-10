import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField } from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchField,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
  };
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      // searchfield: '',
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ robots: users }));
  }
  // onSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    const { robots } = this.state;
    const { searchField, onSearchChange } = this.props;
    const filterRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (!robots.length) {
      return <h1>Loading</h1>;
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </div>
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
