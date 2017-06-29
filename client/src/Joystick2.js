import React, { Component } from 'react';


const styles = {
    height: "100px",
    backgroundColor: "blue",
};

class Joystick2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        const joystickParams = {
            zone: document.getElementById("joystick2"),
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

export default Joystick2;
