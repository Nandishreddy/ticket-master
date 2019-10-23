import React from 'react'
import CustomerForm from './Form'
import axios from '../../config/axios'

import _ from 'lodash'
import FormError from '../common/FormError'


export default class CustomerAdd extends React.Component {
    constructor(){
        console.log("constructor - Customer New")
        super()
        this.state = {
            errors : {}
        }
    }

    handleSubmit = formData => {
        console.log("handle submit - Customer New")
        console.log('new',formData)
        axios.post('/customers',formData,{
            headers:{
                'x-auth':localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.data.errors) {
                //alert(response.data.message)
                const errors = response.data.errors
                this.setState({errors})
            }
            else {
                //redirect automatically
                this.props.history.push('/customers')
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    render(){
        console.log("render - Customer New")
        return (
             <div>
                 <h3>Add Customer Page</h3>
                 {
                     !_.isEmpty(this.state.errors) && <FormError errors = {this.state.errors}/>
                 }
                 <CustomerForm handleSubmit={this.handleSubmit}/>
             </div>
        )
    }
}