import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Contact extends React.Component {
    cancelCourse() {
        document.getElementById("contact-form").reset();
    }
    

    render() {
        return (
            <Form id="contact-form">
                <Form.Group>
                    <Form.Label id="form-label">Email Address</Form.Label>
                    <Form.Control id="form-ctrl" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="form-label">Subject</Form.Label>
                    <Form.Control id="form-ctrl" as="textarea" />
                </Form.Group>
                <Form.Group>
                    <Form.Label id="form-label">Message</Form.Label>
                    <Form.Control id="form-ctrl" as="textarea" rows="5"/>
                </Form.Group>
                <Form.Row id="form-row">
                    <Link id="form-button" to={{pathname: '/'}}>
                        <Button variant="light">Cancel</Button>
                    </Link>
                    <Button id="form-button" variant="light" onClick={this.cancelCourse}>Submit</Button>
                </Form.Row>
            </Form>
        )
    }
}