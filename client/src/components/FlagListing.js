import React, { Component } from 'react'
import {Container, Col, Row, Form, Button} from 'react-bootstrap';
import './FlagListing.css';
import axios from 'axios';

export default class FlagListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
          link:  '',
          email: '',
          description: ''
        };
    
        this.handleLinkChange = this.handleLinkChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleLinkChange(event) {
        this.setState({link: event.target.value});

    }
    
    handleSubmit(event) {
        
        event.preventDefault();

        // axios
        //     .post('http://localhost:5000/flaglisting', this.state)
        //     .then(() => console.log('Email Sent'))
        //     .catch(err => {
        //         console.error(err);
        // });
        // alert("Thank you for contacting betterbnb.");

        this.setState({
            link: '',
            email: '',
            description: '',
        });

        alert("You have succesfully flagged the listing, thank you.")
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
                            <Form>
                            <h3 className="subtitle">Listing link </h3>

                            <Form.Group controlId="formBasicLink">
                                <Form.Control type="email" placeholder="Enter listing url" onChange={this.handleLinkChange}/>
                                <Form.Text className="text-muted">
                                    So we can identify the listing
                                </Form.Text>
                                </Form.Group>

                            
                            <h3 className="subtitle">What is misleading about the listing?</h3>
                            
                            
                            <Form.Group controlId="exampleForm.ControlTextarea1"> 
                                <Form.Control onChange={this.handleDescriptionChange} as="textarea" rows="6" />
                            </Form.Group>
                       
                            <h3 className="subtitle">Email: </h3>
        
                                <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter email" onChange={this.handleEmailChange}/>
                                <Form.Text className="text-muted">
                                   So we can contact you about a listing's status 
                                </Form.Text>
                                </Form.Group>
                            <br></br>
                            <Button onClick={this.handleSubmit}>
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
