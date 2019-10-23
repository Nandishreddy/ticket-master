import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

import EmployeeItem from './Item'

export default class EmployeeList extends React.Component{
    constructor(){
        super()
        this.state = {
            employees : []
        }
    }

    componentDidMount(){
        axios.get(`/employees`,{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            console.log(response.data)
            const employees = response.data
            this.setState({employees})
        })
    }

    render(){
        return (
            <div>
                <h2>Listing Employees - {this.state.employees.length}</h2>
                <ul>
                {this.state.employees.map(employee => {
                    return <EmployeeItem 
                    id={employee._id}
                    key={employee._id}
                    name={employee.name}/>
                })}
                </ul>
                <Link to="/employees/new">Add New Employee</Link>
            </div>
        )
    }
}