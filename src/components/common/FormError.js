import React from 'react'

export default function FormError(props){
    return (
        <div style = {{color:'red'}}>
             <h4>These error's prohibited the form from being saved</h4>
                    <ul>
                        {Object.keys(props.errors).map((prop,index) =>{
                            return <li key={index}>{props.errors[prop].message}</li>
                        })}
                    </ul>
        </div>
    )
}