import React, { Component } from 'react';
import './Shoot.css';
import nipple from 'nipplejs';



class Shoot extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let socket = this.props.socket;
        const joystickParams = {
            zone: document.getElementById("shoot")
        };
        const manager = nipple.create(joystickParams);
        manager.on('added', function(evt, nipple) {
            console.log("added");
            socket.emit('shoot');
        });
    };

    render() {
        return(<div>SHOOT</div>);
    }
}

export default Shoot;
