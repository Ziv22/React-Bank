import { Component } from 'react'
import React from 'react'

export class Operations extends Component {
    constructor(){
        super()
        this.state={
            amount:"",
            vendor:"",
            category:""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange = event =>{
        const {target}  = event
        const value     = target.type === 'checkbox' ? target.checked : target.value
        const {name}    = target
    
        this.setState({
          [name]: value
        })
    }

    makeTransaction = async event =>{
        const {name} = event.target
        let {amount, vendor, category, date} = this.state

        amount   = name === 'deposit' ? amount : amount * -1
        vendor   = vendor.toLocaleLowerCase()
        category = category.toLocaleLowerCase()

        amount && vendor && category && await this.props.makeTransaction({amount, vendor,category, date})
        
    }

    render() {
         
    return (
        <div className="operations-container">
            <h1>New Transaction</h1>
            <div className="input-container">
                <label className="label" htmlFor="amount"> Amount: </label>
                <input value={this.state.amount} name="amount" onChange={this.handleInputChange} type="number"/>
            </div>

            <div className="input-container">
                <label className="label" htmlFor="vendor"> Vendor: </label>
                <input value={this.state.vendor} name="vendor" onChange={this.handleInputChange}/>
            </div>
            <div className="input-container">
                <label className="label" htmlFor="category"> Category: </label>
                <input value={this.state.category} name="category" onChange={this.handleInputChange}/>
            </div>
            <div className="input-container">
                <label className="label" htmlFor="date"> Date: </label>
                <input type="date" alue={this.state.category} name="date" onChange={this.handleInputChange}/>
            </div>
            <div>
                <button id="deposit"  name="deposit"  onClick={this.makeTransaction}>Deposit</button>
                <button id="withdraw" name="withdraw" onClick={this.makeTransaction}>Withdraw</button>
            </div>
        </div>
    )
    }
}

export default Operations;
