import React from 'react'
export default class DepartmentSearch extends React.Component{
    constructor(){
        super()
        this.state = {
            name:''
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleKeyUp(e){
        const searchText=e.target.value
        this.props.handleKeyUp(searchText)

    }


    render(){
        return (
            <div>
                <label htmlFor="name">Search key</label>
                <input type="text" value={this.state.name} id="name" name="name" onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
            </div>
        )
    }
}