import { BrowserRouter as Router, Link, Redirect, Route} from 'react-router-dom'
import TransactionsByCategory from './Components/TrabsactionsByCategory'
import Transactions from './Components/Transactions'
import Operations from './Components/Operations'
import { Component } from 'react'
import React from 'react'
import axios from 'axios'
import './App.css'

export class App extends Component {

  constructor() {
    super()
    this.state = {
      data:[], 
      balance: "",
      redirect:null
    }
  }

  componentDidMount = async () =>{
    await this.getData()
    this.calculateBalance()
  }

  getData = async () =>{
    try{
      let transactions = await axios.get("http://localhost:3100/transactions")
        await this.setState({data:transactions.data})
        this.calculateBalance()
    }
    catch(err){
      console.log(err)
    }
  }
  calculateBalance = () =>{
    let balance = 0 
    this.state.data.forEach(t => balance += parseInt(t.amount))
    this.setState({balance})
  }

  makeTransaction = async transaction =>{
    try{
      await axios.post("http://localhost:3100/transactions", transaction)
      await this.getData()
      this.toTransactionsPage()
    }
    catch(err){
      console.log(err)
    }
  }

  toTransactionsPage = () =>{
    this.setState({ redirect: "/transactions" })
  }

  deleteTransaction = async id =>{
    try{
      await axios.delete(`http://localhost:3100/transactions/${id}`)
      await this.getData()
    }
    catch(err){
      console.log(err)
    }
  }
  
  render() {
    const transactions = this.state.data
    
    return (
      <div className="App">
        <Router>
          <div className="navbar">
            <h1 className="react-bank-header">Ract Bank</h1>
            <Link className="navLink" to="/operations">  New Transaction</Link>
            <Link className="navLink" to="/transactions">  Transactions</Link>
            <Link className="navLink" to="/TransactionsByCategory">  By Category  </Link>
            <h2 className={`header ${this.state.balance > 500 ? "positive" : "negative"}`}>Balance: {this.state.balance}$</h2>
          </div>

          <Route path="/operations" exact render={()=><Operations makeTransaction={this.makeTransaction}/>}/>
          <Route path="/TransactionsByCategory" exact render={()=><TransactionsByCategory />}/>
          <Route path="/transactions" exact render={() =><Transactions transactions={transactions} deleteTransaction={this.deleteTransaction}/>}/>
          {this.state.redirect && <Redirect to={this.state.redirect}/>}
        </Router>
      </div>
    )
  }
}

export default App