import React, { Component } from 'react';
import {Button, Alert} from 'react-bootstrap'


class Exception extends Component {
    constructor(props){
        super(props);
        this.state = {exception: ''};
        props.socket.on('exception', (data) => this.updateAlert(data));
    }

    updateAlert(data) {
        this.setState({
            exception: data
        })
    }

    handlePing(){
        this.props.socket.emit('ping orb');
    }


    render() {
        if(this.state.exception){
            return(
                <div>
                    <Alert bsStyle="warning">
                        <strong>{this.state.exception}</strong>
                        <Button onClick={() => this.handlePing()}>Ping</Button>
                    </Alert>
                </div>
            )
        }else{
            return(<div/>)
        }
    }
}

export default Exception;
