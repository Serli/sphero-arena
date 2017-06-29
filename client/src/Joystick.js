import React, { Component } from 'react';
import './Joystick.css';

class Joystick extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const joystickParams = {
            zone: document.getElementById("joystick"),
            color: "red",
        };
        const manager = require('nipplejs').create(joystickParams);
        manager.on('added', function(evt, nipple) {
            console.log("added");
            nipple.on('move', function(evt) {
                console.log("moved");
            });
        });
    };

    render() {
        return(<div />);
    }
}

export default Joystick;
