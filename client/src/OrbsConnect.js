import React, { Component } from 'react';

class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        props.socket.io.on('message', function (msg) {
            console.log('hello world!');
        });
    }

    componentDidMount() {
        console.log('connected');
        //let socket = this.props.socket();
        console.log(this.props.socket);
    }

    handleClick(){
        this.props.socket.io.emit('message', 'Hello world!');
    }

    render() {
        return (
            <div>
                <input id="orbCOM4" value="COM4 ORB" />
                <p onClick={this.handleClick}>props : {this.props.title}</p>
            </div>
        );
    }
}

export default OrbsConnect;