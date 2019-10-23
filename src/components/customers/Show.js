import React from 'react'
import axios from '../../config/axios'
import {Link} from 'react-router-dom'


class CustomerShow extends React.Component{
    constructor(){
        super()
        this.state={
            customer: {}
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/customers/${id}`,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then(response => {
            const customer = response.data
            console.log(customer)
            this.setState({customer})
        })
    }
    render(){
        const id = this.props.match.params.id
        return(
            <div>
                <h2>{this.state.customer.name} - {this.state.customer.email}</h2>
                <Link to={`/customers/edit/${id}`}>edit</Link>
            </div>
        )
    }
}

export default CustomerShow