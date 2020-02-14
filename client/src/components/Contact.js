import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Contact() {
    return (
        <Form>
            <Form.Group>
                <Form.Label id="form-label">Email Address</Form.Label>
                <Form.Control id="form-ctrl" type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group>
                <Form.Label id="form-label">Subject</Form.Label>
                <Form.Control id="form-ctrl" as="textarea" />
            </Form.Group>
            <Form.Group>
                <Form.Label id="form-label">Message</Form.Label>
                <Form.Control id="form-ctrl" as="textarea" rows="5" />
            </Form.Group>
            <Form.Row id="form-row">
                <Link id="form-button" to={{pathname: '/'}}>
                    <Button variant="light">Cancel</Button>
                </Link>
                <Button id="form-button" variant="light">Submit</Button>
            </Form.Row>
        </Form>
    )
}

export default Contact;