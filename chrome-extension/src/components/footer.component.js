import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export default class Footer extends Component {
    
    constructor(props) {
        super(props)
        
        this.createNewTab = this.createNewTab.bind(this)

    }

    createNewTab() {
        window.chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            let currentUrl = tabs[0].url;
            let redirectUrl = 'http://localhost:3000/details/?url=' + currentUrl
            window.chrome.tabs.create({'url': redirectUrl})
        });
    }
    
    render() {
        return(
            <div className='extension-footer'>
                <div className='text-center'>
                    <Card.Footer className="text-muted">
                    <Row>
                        <Col>
                            <Link onClick={this.createNewTab}><i class="fas fa-link"></i></Link>
                        </Col>      
                    </Row>    
                    </Card.Footer>
                </div>
            </div>
        )
    }
}