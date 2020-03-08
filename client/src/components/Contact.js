import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';


export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            subject: '',
            message: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        //alert(this.state.email);
        event.preventDefault();

        axios
            .post('http://localhost:5000/email', this.state)
            .then(() => console.log('Email Sent'))
            .catch(err => {
                console.error(err);
        });

        this.setState({
            email: '',
            subject: '',
            message: ''
        });
        
    }
    
    

    render() {
        return (
            <Form id="contact-form">
                <Form.Group>
                    <Form.Label id="form-label">Email Address</Form.Label>
                    <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange} id="form-ctrl" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="form-label">Subject</Form.Label>
                    <Form.Control id="form-ctrl" name="subject" value={this.state.subject} onChange={this.handleInputChange} as="textarea" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="form-label">Message</Form.Label>
                    <Form.Control id="form-ctrl" name="message" value={this.state.message} onChange={this.handleInputChange} as="textarea" rows="5"/>
                </Form.Group>
                <Form.Row id="form-row">
                    <Link id="form-button" to={{pathname: '/'}}>
                        <Button variant="light">Cancel</Button>
                    </Link>
                    <Button id="form-button" variant="light" onClick={this.handleSubmit}>Submit</Button>
                </Form.Row>
            </Form>
        )
    }
}