import React from 'react'
export default class CustomerSearch extends React.Component{
    constructor(){
        super()
        this.state = {
            name:''
        }
        this.handleChange=this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        const searchText = e.target.value
        this.props.handleChange(searchText)
    }

    render(){
        return (
            <div>
                <label htmlFor="name">Search key</label>
                <input 
                   type="text" 
                   value={this.state.name} 
                   id="name" 
                   name="name" 
                   onChange={this.handleChange} />
            </div>
        )
    }
}