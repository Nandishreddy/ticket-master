import React from 'react'
import axios from '../../config/axios'
import CustomerSearch from './Search'

import {Link} from 'react-router-dom'

export default class CustomerList extends React.Component {
    constructor(){
        super()
        this.state = {
            customers : [],
            searchText : '',
            isLoading : true
        }
        this.handleChange=this.handleChange.bind(this)
    }

    componentDidMount(){
        axios.get('/customers',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            const customers = response.data
            this.setState({customers,isLoading:false})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleChange=(searchText) => {
            this.setState({searchText})
            const customers=this.state.customers.filter(cust=>cust.name.toLowerCase().includes(searchText.toLowerCase()))
            this.setState({customers})
    }

    render(){
        return (
             <div>
                 <h2>Listing Customers - {this.state.customers.length} </h2>
                 {this.state.isLoading? (<h4>Loading....</h4>):(
                    <div>
                        <CustomerSearch handleChange={this.handleChange}/> <br/>
                        <table>
                            <thead>
                                <tr>
                                    <th> Cust Id </th>
                                    <th> Name </th>
                                    <th> Email </th>
                                    <th> Mobile </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.customers.map((customer,index)=> {
                                    return (
                                        <tr key = {customer._id}>
                                            <td> { index+1} </td>
                                            <td><Link to={`/customers/${customer._id}`}>
                                            {customer.name} </Link> </td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobile}</td>
                                            <td><Link to={`/customers/${customer._id}`}>Show</Link></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                 </div>
                 )}
                 <Link to="/customers/new">Add Customer</Link>
             </div>
        )
    }
}