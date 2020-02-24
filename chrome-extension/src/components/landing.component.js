import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Landing extends Component {
    
    
    render() {
        return(
            <div className='container' style={{paddingTop: "35%"}}>
                <div className='text-center'>
                    <Spinner animation="grow" variant="dark" />
                    <p>Visit an Airbnb listing to get started...</p> 
                </div>
            </div>
        )
    }
}