import { Component } from 'react'
import React from 'react'

export class Transaction extends Component {

    deleteTransaction = () =>{
        this.props.deleteTransaction(this.props.transaction._id)
    }
    render() {
        const {transaction} = this.props
        return (
        <div className={`transaction transaction-container ${transaction.amount > 0 ? "positive" : "negative"}`}>
            <span> {transaction.date} </span>    
            <span> {transaction.amount}$ </span>
            <span> {transaction.vendor} </span>
            <span> {transaction.category} </span>
            <button onClick={this.deleteTransaction}>Delete</button>
        </div>
        )
    }
}

export default Transaction
