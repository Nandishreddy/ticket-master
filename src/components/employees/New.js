import React from 'react'
import EmployeeForm from './Form'
import axios from '../../config/axios';
import FormError from '../common/FormError'
import _ from 'lodash'

export default class EmployeeAdd extends React.Component {
    constructor(){
        super()
        this.state = {
            errors : ''
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        axios.post('/employees',formData,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(!response.data.errors){
                this.props.history.push('/employees')
            }
            else {
                const errors = response.data.errors
                this.setState({errors})
            }
        })
    }
    render(){
        return (
            <div>
                <h3>Add Employee Page</h3>
                {
                     !_.isEmpty(this.state.errors) && <FormError errors = {this.state.errors}/>
                 }
                <EmployeeForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}