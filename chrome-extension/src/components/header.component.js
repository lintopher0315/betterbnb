import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

export default class Header extends Component {
    
    render() {
        return(
            <div>
                <Card.Header>
                <div className='container'>
                    <div className='text-center'>
                        <h1><b>Betterbnb</b></h1>
                    </div>
                </div> 
                </Card.Header>
            </div>
        )
    }
}