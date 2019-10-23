import React from 'react'
import axios from '../../config/axios';
import {Link} from 'react-router-dom'

export default class EmployeeShow extends React.Component {
    constructor(){
        super()
        this.state = {
            employee : {}
        }
    }
    componentDidMount(){
        axios.get(`/employees/${this.props.match.params.id}`,{
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
        .then(response => {
            const employee = response.data
            console.log(employee)
            this.setState({employee})
        })
    }
    render(){
        return (
            <div>
                <h3>Employee Show Page</h3>
                <h5>{this.state.employee.name}</h5>
                <h5>{this.state.employee.email}</h5>
                <h5>{this.state.employee.mobile}</h5>
                {/* <h5>{(this.state.employee.department) ? this.state.employee.department : this.state.employee.department.name}</h5> */}
                <Link to="/employees">Back</Link>
            </div>
        )
    }
}