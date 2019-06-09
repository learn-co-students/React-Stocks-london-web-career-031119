import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'
// import SearchBar from './components/SearchBar'; duplicate



class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <MainContainer />
      </div>
    );
  }
}

export default App;
