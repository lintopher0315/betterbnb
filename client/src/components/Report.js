import React from 'react';
import axios from 'axios'

export default class Report extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: undefined
        }



    }

    // this is a work in progress!! 
    render() {
        if (this.state.data === undefined) { 
            return (
                <div className='text-center'>
                    <h1>Report</h1>
                    <hr />
                    

                </div>
            )
        }
        else {

        }
    }

}

