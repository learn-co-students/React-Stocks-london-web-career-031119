import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'

class App extends Component {

  state = {
    stocks: [],
    myPortfolio: [], 
    filter: ''  
  }

  getStocks = () => {
    return fetch('http://localhost:3000/stocks')
      .then(resp => resp.json())
      .then(stocks => this.setState({stocks}))
  }

  componentDidMount() {
    this.getStocks()
  }

  handleSortStocks = (e) => {
    e.preventDefault()
    const value = e.target.value
    if (value === 'Alphabetically') {
      this.setState({stocks: this.state.stocks.sort((a, b) => a.name.localeCompare(b.name))})
    } else if (value === 'Price') {
      this.setState({stocks: this.state.stocks.sort((a, b) => {
        if (a.price > b.price) return 1
        if (a.price < b.price) return -1
        else 0
      })})
    } else {
      this.setState({stocks: this.state.stocks})
    }
  }

  handleFilterToggled = (e) => {
    this.setState({filter: e.target.value})
  }

  handleFilterStocks = () => {  
    // this.setState({filter: value})
    const filteredStock = [...this.state.stocks]
    return this.state.filter 
    ? filteredStock.filter(stock => stock.type === this.state.filter)
    : filteredStock

  }

  handleAddandDeleteStockToMyPortfolio = (e) => {
    const {stocks, myPortfolio} = this.state
    const stockId = e.target.id
    let stockClicked = stocks.find(stock => stock.id.toString() === stockId)
    let stockIndexInPortfolio = myPortfolio.indexOf(stockClicked)
    // if stockClicked is already in my portfolio, delete it from myPortfolio
    if (myPortfolio.map(stock => stock.id).includes(stockClicked.id)) {
      myPortfolio.splice(stockIndexInPortfolio, 1)
      this.setState({myPortfolio})
    } else {
      this.setState({stocks, myPortfolio: [...myPortfolio, stockClicked]})
    }
  }

  render() {
    const {myPortfolio} = this.state
    return (
      <div>
        <Header/>
        <MainContainer  
          stocks={this.handleFilterStocks()}
          handleAddandDeleteStockToMyPortfolio={this.handleAddandDeleteStockToMyPortfolio}
          portfolio={myPortfolio}
          handleSortStocks={this.handleSortStocks}
          handleFilterToggled={this.handleFilterToggled}
        />
      </div>
    );
  }
}

export default App;
