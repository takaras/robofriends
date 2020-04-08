import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots()),
  };
};

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }
  // onSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    const {
      searchField,
      onSearchChange,
      robots,
      isPending,
      error,
    } = this.props;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (isPending) {
      return <h1>Loading</h1>;
    } else if (error) {
      return <h2 className="heading-2">Couldn't find any robots</h2>;
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
