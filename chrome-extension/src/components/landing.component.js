import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'

export default class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentMsg: "Visit an Airbnb listing to get started..."
        }
        
        
        window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "BETTERBNB_PLUGIN_EVALUATED_CONFIG") {
              this.setState({
                currentMsg: message.configData
              })
            }
          })

    } 


    componentDidMount() {
        //                configData: message.configData
       /* 
        */
    }
    
    
    render() {
        return(
            <div className='container' style={{paddingTop: "35%"}}>
                <div className='text-center'>
                    <Spinner animation="grow" variant="dark" />
                    <p>{this.state.currentMsg}</p> 
                </div>
            </div>
        )
    }
}