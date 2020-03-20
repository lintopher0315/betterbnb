import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export default class Footer extends Component {
    
    constructor(props) {
        super(props)
        
        this.createNewTab = this.createNewTab.bind(this)

    }

    createNewTab() {
        window.chrome.tabs.create({'url': 'http://localhost:3000/'})

    }
    
    render() {
        return(
            <div className='extension-footer'>
                <div className='text-center'>
                    <Card.Footer className="text-muted">
                    <Row>
                        <Col>
                            <Link to='/'><i class="fas fa-home"></i></Link>
                        </Col>    
                        <Col>
                            <Link onClick={this.createNewTab}><i class="fas fa-link"></i></Link>
                        </Col>      
                        <Col>
                            <Link to='/settings'><i class="fas fa-cog"></i></Link>
                        </Col>   
                        
                    </Row>    
                    </Card.Footer>
                </div>
            </div>
        )
    }
}