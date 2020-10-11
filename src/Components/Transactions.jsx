import Transaction from './Transaction'
import React, { Fragment } from 'react'
import { Component } from 'react'

export class Transactions extends Component {
  render() {
      const transactions = this.props.transactions
    return (
      <div className="transactions-container">
        <Fragment>
            <div className="transaction transaction-header">
              <span> Date</span>
              <span> Amount </span>
              <span> Vendor </span> 
              <span> Category </span>
              <span></span>
            </div>
            {transactions.map(t => 
                        <Transaction key={`${t._id}`} 
                                     transaction={t}
                                     deleteTransaction={this.props.deleteTransaction}
                        />
            )}
        </Fragment>
      </div>
    )
  }
}

export default Transactions
