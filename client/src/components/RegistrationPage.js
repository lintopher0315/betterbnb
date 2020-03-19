import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './RegistrationPage.css'
import axios from 'axios';

export default class RegistrationPage extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       email: '',
       password: '',
       firstName: '',
       lastName: '',
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
     event.preventDefault();
     console.log(this.state);
     axios
            .post('http://localhost:5000/register', this.state)
            .then(() => console.log('Attempting to register user'))
            .catch(err => {
                console.error(err);
        });
     this.setState({
       email: '',
       password: '',
       firstName: '',
       lastName: ''
     });
   }



   

    render() {
        return (
    <div className="page">
        <h1>Registration</h1>
            <Form>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control name="email" value={this.state.email} onChange={this.handleInputChange} type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" value={this.state.password} onChange={this.handleInputChange} type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>First Name</Form.Label>
      <Form.Control name="firstName" value={this.state.firstName} onChange={this.handleInputChange} placeholder="First Name" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Last Name</Form.Label>
      <Form.Control name="lastName" value={this.state.lastName} onChange={this.handleInputChange} placeholder="Last Name" />
    </Form.Group>
  </Form.Row>



  <Button variant="primary" type="submit" onClick={this.handleSubmit}>
    Submit
  </Button>
</Form>
</div>
        )
    }
}