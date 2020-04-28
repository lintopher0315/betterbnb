import React from 'react';
import AlgoliaPlaces from 'algolia-places-react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'

export default class Jumbotron extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            url: ''
        }

        this.updateValue = this.updateValue.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    updateValue(event) {
        const target = event.target;
        const val = target.value

        this.setState({
            url: val
        });
    }

    handleSubmit(event) {
        event.preventDefault()
        var redir = "http://localhost:3000/details/?url=" + this.state.url
        window.location = redir
    }



    // http://localhost:3000/details/?url=
    render() {
        return (
            <div id="container">
                <div id="container-text">
                    Travel safe with Betterbnb
                </div>
                
                <div className='container'>
                    <Form>
                            <Form.Label></Form.Label>
                            <Form.Control type="text" value={this.state.url} onChange={this.updateValue} placeholder="Airbnb Url" /> <br />
                        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                            Go!
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}