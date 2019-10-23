import React from 'react'
import axios from '../../config/axios'
import DepartmentForm from './Form'
import _ from 'lodash'
import DepartmentSearch from './Search'

import FormError from '../common/FormError'

export default class DepartmentList extends React.Component {
    constructor(){
        super()
        this.state = {
            departments : [],
            searchText:'',
            errors:{},
            isLoading:true
        }
    
    }
    componentDidMount(){
        axios.get('/departments',{
            headers : {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            const departments = response.data
            this.setState({departments,isLoading:false})
        })
    }

    handleSubmit=(formData)=>{
        console.log("list form",formData)
        axios.post('/departments',formData,{
            headers: {
                'x-auth' : localStorage.getItem('token')
            }
        })
        .then(response => {
            if(response.data.errors){
                const errors = response.data.errors
                this.setState({errors})
                //window.alert(response.data.message)
            }
            else {
                const department = response.data
                this.setState(prevState => ({
                    departments : [...prevState.departments,department],
                    errors : ''
                }))
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    handleRemove(id){
        const handleRemove = window.confirm("Are you sure?")
        if(handleRemove){
            axios.delete(`departments/${id}`, {
                headers:{
                    'x-auth' : localStorage.getItem('token')
                }
            })
            .then(response=> {
                this.setState(prevState => ({
                    departments : prevState.departments.filter(department=>department._id !== response.data._id)
                }))
            })

        }
    }
    handleKeyUp=(searchText) => {
        this.setState({searchText})
            const departments=this.state.departments.filter(dept=>dept.name.toLowerCase().includes(searchText.toLowerCase()))
            this.setState({departments})
        }

    render(){
        return (
             <div>
                 <h2>Listing Departments - {this.state.departments.length}</h2>
                 
                 {this.state.isLoading ? (<h4>Loading...</h4>): (
                <div>
                     <DepartmentSearch handleKeyUp={this.handleKeyUp}/>
                        <ul>
                        {this.state.departments.map((dept,index) => {
                            return <li key={index+1}>
                            {dept.name}
                            <button onClick={()=>{
                                this.handleRemove(dept._id)
                            }}>remove</button>
                            </li>
                        })}
                    </ul>
                 </div>
                 )}
                 <h3>Add Department</h3>
                 {
                     !_.isEmpty(this.state.errors) && <FormError errors={this.state.errors}/>
                 }
                  <DepartmentForm handleSubmit={this.handleSubmit}/> <br/>
             </div>
        )
    }
}