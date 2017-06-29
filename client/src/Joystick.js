import React, { Component } from 'react';


const styles = {
    height: "100px",
    backgroundColor: "red"
};

class Joystick extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const joystickParams = {
            zone: document.getElementById("joystick"),
            color: "blue",
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
        return(<div style={styles} />);
    }
}

export default Joystick;
