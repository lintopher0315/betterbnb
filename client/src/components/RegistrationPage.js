import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './RegistrationPage.css'

export default class RegistrationPage extends React.Component {

    render() {
        return (
    <div className="page">
        <h1>Registration</h1>
            <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridAddress1">
    <Form.Label>Name</Form.Label>
    <Form.Control placeholder="Enter Name" />
  </Form.Group>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>First Name</Form.Label>
      <Form.Control placeholder="First Name" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Last Name</Form.Label>
      <Form.Control placeholder="Last Name" />
    </Form.Group>
  </Form.Row>



  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
        )
    }
}