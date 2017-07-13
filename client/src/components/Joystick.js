import React, { Component } from 'react';
import '../css/Joystick.css';
import nipple from 'nipplejs';

class Joystick extends Component {

    componentDidMount = () => {
        let socket = this.props.socket;
        let that = this;
        const joystickParams = {
            zone: document.getElementById("joystick"),
            restOpacity: 1,
            size: 175,
        };
        const manager = nipple.create(joystickParams);
        manager.on('added', function (evt, nipple) {
            that.interval = setInterval(() => socket.emit('turn',that.data), 800);
            nipple.on('move', function (evt, data) {
                that.data = data.angle.degree;
            });
            nipple.on('end', function (evt, data) {
                window.clearInterval(that.interval);
                console.log('end');
                socket.emit('stop');
            });
        })
    };

    render() {
        return(<div id="joystick">MOVE</div>);
    }
}

export default Joystick;
