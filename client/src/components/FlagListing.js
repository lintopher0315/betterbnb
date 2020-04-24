import React, { Component } from 'react'
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import './FlagListing.css';

export default class FlagListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1 className="title">Flag A Listing</h1>
                
                <hr></hr>

                <Container>
                    <Row>
                        <Col>
                        <p className="bodytext">If you believe a listing contains false or misleading information 
                            we want to make sure that we are able to track that as a service. At BetterBnB, we want you to get the 
                            most accurate information possible. Please tell us about your experience at this listing and 
                            you believe it contains false advertising or other misleading information. 
                        </p>
                        
                        </Col>
                        
                        
                        
                    </Row>
                    <Row>
                        <Col>
                            <h3>What is misleading about the listing?</h3>
                    
                            <Form>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                
                                <Form.Control as="textarea" rows="6" />
                            </Form.Group>
                       
            
                            <h3>Email: </h3>
                       
                    
                 
                           
                                <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                   So we can contact you about a listing's status 
                                </Form.Text>
                                </Form.Group>
                            <br></br>
                            <Button>
                                Submit
                            </Button>

                            </Form>


                        </Col>
                       
                    </Row>

                    
                </Container>
                
                
                     
            </div>
        )
    }
}
