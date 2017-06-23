import React, { Component } from 'react';

class OrbsConnect extends Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        props.socket.on('test', function (msg) {
            console.log('hello world!', msg);
        });
    }

    componentDidMount() {

    }

    handleClick(){
        this.props.socket.emit('test', 'Hello world!');
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