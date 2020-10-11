import React, { Fragment } from 'react'
import { Component } from 'react'
import axios from 'axios'

export class TransactionsByCategory extends Component {
    constructor() {
        super()
        this.state = {
          data:[], 
        }
      }
    getData = async () =>{
        try{
          let transactions = await axios.get("http://localhost:3100/transactions/bycategory")
          this.setState({data:transactions.data})
        }
        catch(err){
          console.log(err)
        }
    }

    componentDidMount = async () =>{
    await this.getData()
    }

    render() {
        const transactions = this.state.data
        return (
        <div className={`TransactionsByCategory transactions-container`}>
            <div className="transaction transaction-header">
              <span> Amount </span>
              <span> Category </span>
            </div>
                {transactions.map(t => 
                        <div className={`transaction ${t.totalTransactions > 0 ? "positive" : "negative"}`} key={t._id}> 
                        <span> {t._id}</span>
                        <span> {t.totalTransactions}</span>
                </div> )}
        </div>
        )
    }
}

export default TransactionsByCategory;