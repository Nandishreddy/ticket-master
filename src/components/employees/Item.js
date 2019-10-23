import React from 'react'
import {Link} from 'react-router-dom'

export default function EmployeeItem(props){
    return (
        <div>
            <Link to={`/employees/${props.id}`}>{props.name}</Link>
        </div>
    )
}