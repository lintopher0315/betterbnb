import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'react-bootstrap'

export default class Footer extends Component {
    
    
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
                            <Link href="#"><i class="fas fa-link"></i></Link>
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