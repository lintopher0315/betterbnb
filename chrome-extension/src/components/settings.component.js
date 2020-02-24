import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Settings extends Component {
    
    
    render() {
        return(
            <div className='container' style={{paddingTop: "35%"}}>
                <div className='text-center'>
                    <Spinner animation="grow" variant="dark" />
                    <h1>Settings</h1>
                </div>
            </div>
        )
    }
}