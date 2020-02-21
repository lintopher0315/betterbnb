import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Landing extends Component {
    
    
    
    render() {
        return(
            <div className='container'>
                <div className='text-center'>
                    <h1><b>BetterBNB</b></h1>
                    <hr />
                    <p>The official Chrome extension for BetterBNB</p>
                </div>
            </div>
        )
    }
}