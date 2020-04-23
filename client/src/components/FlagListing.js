import React, { Component } from 'react'
import {Container, Col, Row} from 'react-bootstrap';
import './FlagListing.css';

export default class FlagListing extends Component {
    render() {
        return (
            <div>
                <h1>Flag A Listing</h1>
                
                <hr></hr>
                <Row>
                    
                    <p className="bodytext">If you believe a listing contains false or misleading information 
                        we. We want to make sure that at BetterBnB you are getting the 
                        most accurate information possible. 
                    </p>
                    
                </Row>
                <Row>
                    <h3>What is misleading about the listing?</h3>
                </Row>
                
                    
             

                
            </div>
        )
    }
}
