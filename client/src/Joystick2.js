import React, { Component } from 'react';
import './Joystick2.css';



class Joystick2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let socket = this.props.socket;
        const joystickParams = {
            zone: document.getElementById("joystick2"),
            color: "blue",
        };
        const manager = require('nipplejs').create(joystickParams);
        manager.on('added', function(evt, nipple) {
            console.log("added");
            socket.emit('shoot');
        });
    };

    render() {
        return(<div />);
    }
}

export default Joystick2;
