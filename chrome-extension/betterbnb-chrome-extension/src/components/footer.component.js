import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export default class Footer extends Component {
    
    
    
    render() {
        return(
                <div className='text-center'>
                    <Card.Footer className="text-muted">
                    <Row>
                        <Col>
                            <a href="#"><i class="fas fa-home"></i></a>
                        </Col>    
                        <Col>
                            <a href="#"><i class="fas fa-link"></i></a>
                        </Col>      
                        <Col>
                            <a href="#"><i class="fas fa-cog"></i></a>
                        </Col>   
                        
                    </Row>    
                    </Card.Footer>
                </div>
        )
    }
}