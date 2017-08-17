import React, { Component } from 'react';
import '../css/Shoot.css';
import nipple from 'nipplejs';



class Shoot extends Component {
    componentDidMount(){
        let socket = this.props.socket;
        const joystickParams = {
            zone: document.getElementById("shoot")
        };
        const manager = nipple.create(joystickParams);
        manager.on('added', function(evt) {
            console.log("added");
            socket.emit('shoot');
        });
    };

    render() {
        return(<div id="shoot">SHOOT</div>);
    }
}

export default Shoot;
